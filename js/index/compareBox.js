class CompareBox {
	constructor(utils, parent) {
		this.utils = utils;
		this.parent = parent;
		this.compareButton;
		this.container;
		this.companies = [];
		this.createContainer();
		this.createCompareButton();
		this.addEventlisteners();
	}

	createContainer = () => {
		this.container = this.utils.createElement('div', [
			'min-100 flex-grow-1 d-flex justify-content-start align-items-center ',
		]);
		this.parent.innerHTML = `<div class = 'card py-3 shadow col-xl-7 col-md-9 col-lg-7 col-sm-11 d-flex flex-row'></div>`
		this.container.id = 'compare-companies-container';
		this.parent.firstChild.append(this.container);
	};

	createCompareButton = () => {
		this.compareButton = this.utils.createElement('button', ['btn btn-link']);
		this.compareButton.id = 'compare-button';
		this.compareButton.innerText = 'Compare Companies';
		this.compareButton.disabled = true;
		this.parent.firstChild.append(this.compareButton);
	};

	addEventlisteners = () => {
		this.compareButton.addEventListener('click', this.launchSearch);
	};

	launchSearch = () => {
		let symbols = '';
		this.companies.forEach((company, index) => {
			if (index !== this.companies.length - 1) {
				symbols += company.symbol + ',';
			} else {
				symbols += company.symbol;
			}
		});
		window.location.href = `./company.html?symbol=${symbols}`;
	};

	toggleCompareButton = (booleanValue) => {
		this.compareButton.disabled = booleanValue;
	};

	addCompanies = (newCompany) => {
		let doesCompanyExist = this.doesCompanyExist(newCompany);
		if (this.companies.length < 3 && !doesCompanyExist) {
			this.companies.push(newCompany);
			this.refreshCompareCompaniesText();
			this.toggleCompareButton(false);
			this.createCompanyButton(newCompany);
		}
	};
	refreshCompareCompaniesText = () => {
		this.companies.length
			? (this.compareButton.innerText = `Compare ${this.companies.length} Companies`)
			: (this.compareButton.innerText = `Compare Companies`);
	};

	doesCompanyExist = (newCompany) => {
		return this.companies.some((company) => {
			return company.symbol === newCompany.symbol;
		});
	};

	createCompanyButton = (company) => {
		const button = this.utils.createElement('button', ['btn btn-primary mr-2']);
		button.innerText = `${company.symbol}`;
		button.id = `button-cmpn-${company.symbol}`;
		button.addEventListener('click', () => {
			let filteredCompanies = this.companies.filter((compareCompany) => compareCompany.symbol !== company.symbol);
			this.companies = filteredCompanies;
			if (this.companies.length === 0) {
				this.toggleCompareButton(true);
			}
			document.getElementById(`button-cmpn-${company.symbol}`).remove();
			this.refreshCompareCompaniesText();
		});
		this.container.append(button);
	};
}
