class CreateSearchBar {
	constructor() {
		this.domElements = {};
		this.companies = [];
		this.createElements();
		this.appendElements();
	}

	createElement = (elementType, classes) => {
		let element = document.createElement(`${elementType}`);
		classes.length === 1 ? (element.classList = classes) : element.classList.add(...classes);
		return element;
	};

	createElements = () => {
		this.domElements.rootDiv = this.createElement('div', ['root', 'container-fluid', 'justify-content-around']);
		this.domElements.row01 = this.createElement('div', ['spacer', 'row']);
		this.domElements.form = this.createElement('form', ['row d-flex justify-content-around align-items-center']);
		this.domElements.innerDiv = this.createElement('div', ['form-group mb-0 d-flex align-items-center col']);
		this.domElements.input = this.createElement('input', ['d-flex form-control mr-3']);
		this.domElements.input.id = 'searchStock';
		this.domElements.button = this.createElement('button', ['btn btn-primary']);
		this.domElements.button.innerHTML = '<span>Search Stock</span>';
		this.domElements.innerSpinner = this.createElement('span', ['spinner-grow spinner-grow-sm d-none']);

		this.domElements.companiesList = this.createElement('ul', ['row ulList']);
		this.domElements.button.addEventListener('click', this.launchSearch);
	};

	launchSearch = async () => {
		event.preventDefault();
		const url = `https://financialmodelingprep.com/api/v3/search?query=${this.domElements.input.value}&limit=10&exchange=NASDAQ`;
		this.toggleHidde(this.domElements.innerSpinner);
		this.companies = await this.fetchData(url);
		this.companies = await this.createCompaniesList(this.companies);
		this.toggleHidde(this.domElements.innerSpinner);
		console.log(this.companies);
		this.returnCompanies();
	};

	returnCompanies = () => {
		localStorage.setItem('COMPANIES', JSON.stringify(this.companies));
		return this.companies;
	};

	toggleHidde = element => {
		element.classList.toggle('d-none');
	};

	clearElement = element => {
		while (element.firstChild) {
			element.firstChild.remove();
		}
	};

	createCompaniesList = async companies => {
		this.clearElement(this.domElements.companiesList);
		return await Promise.all(
			companies.map(async company => {
				let url1 = `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`;
				company.newData = (await this.fetchData(url1)).profile;
				this.createLliElement(company);
				return company;
			})
		);
	};

	createLliElement = company => {
		let li = this.createElement('li', ['companies-list col-12']);
		li.innerHTML = `<img src=${company.newData.image} alt=${company.name}>
                        <a href='./company.html?symbol=${company.symbol}'>${company.name}</a>
                        <span>(${company.symbol})</span>
                        <span class=${this.getColor(company.newData.changesPercentage)}>
                        ${company.newData.changesPercentage}</span>`;
		this.domElements.companiesList.append(li);
	};

	getColor = string => {
		let number = isNaN(parseFloat(string)) ? this.convToFloat(string) : parseFloat(string);
		if (number < 0) {
			return 'redFont';
		} else if (number > 0) {
			return 'greenFont';
		}
		return 'blackFont';
	};

	convToFloat = string => {
		return parseFloat(string.substr(1)); //slices first character
	};

	fetchData(url) {
		return fetch(url).then(response => response.json());
	}

	appendElements = () => {
		this.domElements.button.prepend(this.domElements.innerSpinner);
		this.domElements.innerDiv.append(this.domElements.input, this.domElements.button);
		this.domElements.form.append(this.domElements.innerDiv);
		this.domElements.rootDiv.append(this.domElements.row01, this.domElements.form, this.domElements.companiesList);
		document.body.prepend(this.domElements.rootDiv);
	};
}
