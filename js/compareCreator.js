class CompareCreator {
	constructor(utils, parent) {
		this.utils = utils;
		this.parent = parent;
		this.button;
		this.selectedCompanies = [];
		this.createCompareDiv('Compare');
		this.appendToParent();
		this.addEventListeners();
	}

	createCompareDiv = (text) => {
		const { createElement } = this.utils;
		this.button = createElement('button', ['btn btn-primary']);
		this.button.innerText = text;
	};

	addEventListeners = () => {
		this.button.addEventListener('click', this.launchSearch);
	};

	launchSearch = () => {
		console.log('click');
		console.log(this.selectedCompanies);
	};

	addSymbol = (newCompany) => {
		console.log(newCompany);
		if (
			this.selectedCompanies.length < 3 &&
			!this.selectedCompanies.some((company) => {
				return company.symbol === newCompany.symbol;
			})
		) {
			this.selectedCompanies.push(newCompany);
			this.renderButtons();
		}
	};

	renderButtons = () => {
		const { createElement } = this.utils;
		let companyButton = createElement('buton', ['btn btn-primary']);
		companyButton.innerText = company.symbol;
		this.parent.prepend(companyButton);
	};

	removeCompany = () => {};

	appendToParent = () => {
		const { toggleClass } = this.utils;
		this.parent.append(this.button);
		toggleClass(this.parent, 'd-none');
		toggleClass(this.parent, 'd-flex');
	};
}
