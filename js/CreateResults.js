class CreateResults {
	constructor(utils, domUL) {
		this.utils = utils;
		this.domUL = domUL;
		this.matchString = '';
	}
	checkMatch = (company) => {
		// regenarate regex of the expression that we are gooing to look
		// if found, replace it.
		let stringName = company.name;
		let stringSymbol = company.symbol;
		const pattern = new RegExp(this.matchString, `i`);
		let name = stringName.replace(pattern, `<span class='highlight'>$&</span>`);
		let symbol = stringSymbol.replace(pattern, `<span class='highlight'>$&</span>`);
		return { name: name, symbol: symbol };
	};

	createLiElement = (company) => {
		let highlight = this.checkMatch(company);
		let companyItem = this.utils.createElement('li', ['companies-list col-12']);
		let compareButton = new CompareButton(this.utils.createElement, company).button;
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
		console.log(inputValue);
		this.matchString = inputValue;
		companies.forEach((element) => {
			this.checkMatch(element);
			const item = this.createLiElement(element);
			this.domUL.append(item);
		});
	}
}
