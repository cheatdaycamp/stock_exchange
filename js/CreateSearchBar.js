class CreateSearchBar {
	constructor() {
		this.domElements = {};
		this.companies = [];
		this.createElements();
		this.setAttributes();
		this.appendElements();
	}

	createElement = (elementType, classes) => {
		const element = document.createElement(`${elementType}`);
		classes.length === 1 ? (element.classList = classes) : element.classList.add(...classes);
		return element;
	};

	createElements = () => {
		this.domElements.rootDiv = this.createElement('div', ['root', 'container-fluid']);
		this.domElements.row01 = this.createElement('div', [
			'row justify-content-end p-3 d-flex align-items-center shadow mb-5',
		]);
		this.domElements.logo = this.createElement('div', ['logo']);
		this.domElements.form = this.createElement('div', ['input-group mb-3']);
		this.domElements.input = this.createElement('input', ['form-control']);
		this.domElements.innerDiv = this.createElement('div', ['input-group-append']);
		this.domElements.button = this.createElement('button', ['btn btn-primary']);
		this.domElements.spinner = this.createElement('div', ['row justify-content-center']);
		this.domElements.companiesList = this.createElement('ul', ['row ulList']);
		this.domElements.button.addEventListener('click', this.launchSearch);
	};

	setAttributes = () => {
		const { input, button, spinner } = this.domElements;
		button.textContent = 'Search Stock';
		input.id = 'searchStock';
		input.setAttribute('type', 'text');
		spinner.innerHTML = `<div id='spinner' class="spinner-border text-black d-none" role="status">
        <span class="sr-only">Loading...</span>
        </div>`;
	};

	appendElements = () => {
		const { input, button, spinner, innerDiv, row01, form, companiesList, rootDiv, logo } = this.domElements;
		row01.append(logo);
		innerDiv.append(button);
		form.append(input, innerDiv);
		rootDiv.append(row01, form, spinner, companiesList);
		document.body.prepend(rootDiv);
	};

	launchSearch = async () => {
		const { spinner, input } = this.domElements;
		event.preventDefault();
		const url = `https://financialmodelingprep.com/api/v3/search?query=${input.value}&limit=10&exchange=NASDAQ`;
		this.toggleHidde(spinner.firstChild);
		this.companies = await this.fetchData(url);
		this.companies = await this.createCompaniesList(this.companies);
		this.toggleHidde(spinner);
		this.returnCompanies();
	};

	returnCompanies = () => {
		localStorage.setItem('COMPANIES', JSON.stringify(this.companies));
		return this.companies;
	};

	toggleHidde = (element) => {
		element.classList.toggle('d-none');
	};

	clearElement = (element) => {
		while (element.firstChild) {
			element.firstChild.remove();
		}
	};

	checkSubstring = (input, phrase) => {
		let positions = [];
		for (let i = 0; i < phrase.length; i++) {
			let index = phrase.toLowerCase().indexOf(input.toLowerCase(), i);
			if (index !== -1) {
				let tupple = {};
				tupple.start = index;
				tupple.end = index + input.length - 1;
				positions.push(tupple);
				i = i + tupple.end;
			}
		}

		let search = phrase.toLowerCase().search(input.toLowerCase());
		let length = input.length;
		console.log(input, phrase, search, length, positions);
		return positions;
	};

	checkSubstring2 = (input, item) => {
		let positions = []; // [0, 12, 34, ]
		console.log(positions);
		//{indexStart: 0, Indexend:1}, {indexStart: 12, Indexend:13}
		for (let i = 0; i < item.length; i++) {
			let index = item.toLowerCase().indexOf(input.toLowerCase(), i);
			if (index !== -1) {
				//tupple.start = index;
				//tupple.end = index + input.length - 1;
				positions.push(index);
				i = i + input.length;
			}
		}
		console.log(positions);
		let spanString = '';
		for (let j = 0; j < positions.length; j++) {
			for (let k = 0; k < item.length; k++) {
				if (j === k && j === 0) {
					spanString += '<span class="yellow">';
					spanString += item[k];
				} else if (j === k) {
					spanString += '</span><span class="yellow">';
					spanString += item[k];
				} else {
					spanString += item[k];
				}
				if (j === k + input.length) {
					spanString += '</span>';
				}
			}
		}
		item.replace();
	};

	createCompaniesList = async (companies) => {
		this.clearElement(this.domElements.companiesList);
		return await Promise.all(
			companies.map(async (company) => {
				let url1 = `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`;
				company.newData = (await this.fetchData(url1)).profile;
				this.createLliElement(company);
				return company;
			})
		);
	};

	createLliElement = (company) => {
		let li = this.createElement('li', ['companies-list col-12']);
		li.innerHTML = `<div class= 'row d-flex'>
                            <img src=${company.newData.image} alt=${company.name}>
                            <a href='./company.html?symbol=${company.symbol}'>${company.name}</a>
                            <span>(${company.symbol})</span> <span class=${this.getColor(
			company.newData.changesPercentage
		)}>${company.newData.changesPercentage}</span>
                        </div>
                        `;
		this.domElements.companiesList.append(li);
	};

	getColor = (string) => {
		//checking for parse. If not a number, slice first character. If not, parse.
		let number = isNaN(parseFloat(string)) ? this.convToFloat(string) : parseFloat(string);
		if (number < 0) {
			return 'redFont';
		} else if (number > 0) {
			return 'greenFont';
		}
		return 'blackFont';
	};

	convToFloat = (string) => {
		return parseFloat(string.substr(1)); //slices first character
	};

	fetchData(url) {
		return fetch(url).then((response) => response.json());
	}
}
