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
			'min-100 flex-grow-1 d-flex justify-content-start align-items-center border-2',
		]);
		this.container.id = 'compare-companies-container';
		this.parent.append(this.container);
	};

	createCompareButton = () => {
		this.compareButton = this.utils.createElement('button', ['btn btn-primary']);
		this.compareButton.id = 'compare-button';
		this.compareButton.innerText = 'Compare Companies';
		this.compareButton.disabled = true;
		this.parent.append(this.compareButton);
	};

	toggleCompareButton = (booleanValue) => {
		this.compareButton.disabled = booleanValue;
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
		window.location.href = `./compare.html?symbol=${symbols}`;
	};

	addCompanies = (newCompany) => {
		console.log('b');
		const { clearElement } = this.utils;
		let doesCompanyExist = this.doesCompanyExist(newCompany);
		if (this.companies.length < 3 && !doesCompanyExist) {
			this.companies.push(newCompany);
			this.refreshCompareCompaniesText();
			this.toggleCompareButton(false);
			clearElement(this.container);
			this.createCompanyButtons();
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

	createCompanyButtons = () => {
		console.log('hola');
		const { clearElement } = this.utils;
		this.companies.forEach((company) => {
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
				//.parentElement.removeChild(document.getElementById(`button-cmpn-${company.symbol}`));
			});
			this.container.append(button);
		});
	};
}
