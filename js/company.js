class CompanyCard {
	constructor() {
		(this.param = {}), this.companies, this.filteredCompanies, this.getCompanies();
	}

	getUrlParams = (...param) => {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(...param);
	};

	getCompanies = async () => {
		let param = this.getUrlParams('symbol');
		let url = `https://financialmodelingprep.com/api/v3/company/profile/${param}`;
		console.log(param, url);
		this.companies = this.getCompaniesfromLocalStorage('COMPANIES');
		if (!this.companies) {
			console.log('trying to fetch');
			this.filteredCompanies = await this.fetchData(url);
		} else {
			console.log('iupi');
			this.filteredCompanies = this.companies.filter(company => company.symbol === param);
		}
		console.log(this.filteredCompanies);
	};

	fetchData(url) {
		return fetch(url).then(response => response.json());
	}

	getCompaniesfromLocalStorage(name) {
		return JSON.parse(localStorage.getItem(name));
	}

	filterCompanies = () => {};
}
