class CreateResults {
	constructor(utils, domUL, buttonFunctionality) {
		this.utils = utils;
		this.domUL = domUL;
		this.matchString = '';
		this.buttonFunctionality = buttonFunctionality;
	}
	checkMatch = (stringValue) => {
		const pattern = new RegExp(this.matchString, `i`);
		let replacedString = stringValue.replace(pattern, `<span class='highlight'>$&</span>`);
		return replacedString;
	};

	createLiElement = (company) => {
		let highlight = {};
		highlight.name = company.name;
		highlight.symbol = company.symbol;
		highlight.name = this.checkMatch(company.name);
		highlight.symbol = this.checkMatch(company.symbol);
		let companyItem = this.utils.createElement('li', ['companies-list col-12']);
		let compareButton = new CompareButton(this.utils.createElement, company, this.buttonFunctionality).button;
		let itemRow = this.utils.createElement('div', ['row d-flex justify-content-between']);
		itemRow.innerHTML = `<div class= 'row d-flex justify-content-between'>
                    <div class='d-flex'>
                            <img class='logo-companies'src=${company.profile.image} alt=${company.name}>
                            <a href='./company.html?symbol=${company.symbol}'>${highlight.name}</a>
                            <span>(${highlight.symbol})</span> <span class=${this.utils.getColor(
			company.profile.changesPercentage
		)}>${company.profile.changesPercentage}</span>
        </div>                        </div>                        `;

		itemRow.append(compareButton);
		companyItem.append(itemRow);
		return companyItem;
	};

	createCompaniesList(companies, inputValue) {
		this.matchString = inputValue;
		companies.forEach((element) => {
			const item = this.createLiElement(element);
			this.domUL.append(item);
		});
	}
}
