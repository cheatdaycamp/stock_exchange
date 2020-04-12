class CreateResults {
	constructor(utils, domUL) {
		this.utils = utils;
		this.domUL = domUL;
	}

	createLiElement = (company) => {
		let companyItem = this.utils.createElement('li', ['companies-list col-12']);
		companyItem.innerHTML = `<div class= 'row d-flex'>
                            <img src=${company.newData.image} alt=${company.name}>
                            <a href='./company.html?symbol=${company.symbol}'>${company.name}</a>
                            <span>(${company.symbol})</span> <span class=${this.utils.getColor(
			company.newData.changesPercentage
		)}>${company.newData.changesPercentage}</span>
                        </div>
                        `;
		return companyItem;
	};

	createCompaniesList(companies) {
		companies.forEach((element) => {
			const item = this.createLiElement(element);
			this.domUL.append(item);
		});
	}
}
