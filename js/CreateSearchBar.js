class CreateSearchBar {
	constructor() {
		this.domElements = {};
		this.loadElements();
	}

	createElement = (elementType, classes) => {
		let element = document.createElement(`${elementType}`);
		classes.length === 1 ? (element.classList = classes) : element.classList.add(...classes);
		return element;
	};

	loadElements = () => {
		this.createElements();
		this.appendElements();
	};

	createElements = () => {
		this.domElements.rootDiv = this.createElement('div', ['root', 'container-fluid', 'justify-content-around']);
		this.domElements.row01 = this.createElement('div', ['spacer', 'row']);
		this.domElements.form = this.createElement('form', ['row d-flex justify-content-around align-items-center']);
		this.domElements.innerDiv = this.createElement('div', ['form-group mb-0 d-flex align-items-center col']);
		this.domElements.input = this.createElement('input', ['d-flex form-control mr-3']);
		this.domElements.input.id = 'searchStock';
		this.domElements.button = this.createElement('button', ['btn btn-primary']);
		this.domElements.button.innerText = 'Search Stock';
		this.domElements.companiesList = this.createElement('ul', ['row ulList']);

		//this.domElements.input.addEventListener('onchange', this.print);
		this.domElements.button.addEventListener('click', this.launchSearch);
	};

	launchSearch = async event => {
		event.preventDefault();
		console.log(this.domElements.input.value);
		const url = `https://financialmodelingprep.com/api/v3/search?query=${this.domElements.input.value}&limit=10&exchange=NASDAQ`;
		let companies = await this.fetchData(url);
		this.createCompaniesList(companies);
		//this.clearElement(document.body);
	};

	clearDom = element => {
		while (element.firstChild) {
			element.firstChild.remove();
		}
	};

	createCompaniesList = companies => {
		this.clearDom(this.domElements.companiesList);
		companies.forEach(company => {
			let li = this.createElement('li', ['companies-list col-12']);
			li.innerText = `<a href='www.google.com'>${company.name}</a> <span>${company.symbol}</span>`;
			this.domElements.companiesList.append(li);
		});
		console.log(ulList);
		this.domElements.companiesList = ulList;
	};

	async fetchData(url) {
		return await fetch(url).then(response => response.json());
	}

	appendElements = () => {
		this.domElements.innerDiv.append(this.domElements.input, this.domElements.button);
		this.domElements.form.append(this.domElements.innerDiv);
		this.domElements.rootDiv.append(this.domElements.row01, this.domElements.form, this.domElements.companiesList);
		document.body.prepend(this.domElements.rootDiv);
	};

	print() {
		console.log('hola');
		//console.log(this.domElements);
	}
}
