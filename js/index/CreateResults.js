class CreateResults {
  constructor(utils, domUL, callbackFunction, API) {
    this.API = API;
    this.utils = utils;
    this.domUL = domUL.firstChild;
    this.matchString = "";
    this.callbackFunction = callbackFunction;
  }

  checkMatch = (company) => {
    if (company !== null) {
      let stringName = "",
        stringSymbol = "",
        name = "",
        symbol = "";
      company.name && (stringName = company.name);
      company.symbol && (stringSymbol = company.symbol);

      const pattern = new RegExp(this.matchString, `i`);
      if (stringName)
        name = stringName.replace(pattern, `<span class='highlight'>$&</span>`);
      if (stringSymbol)
        symbol = stringSymbol.replace(
          pattern,
          `<span class='highlight'>$&</span>`
        );
      return { name: name, symbol: symbol };
    }
  };

  createLiElement = (company) => {
    let highlight = this.checkMatch(company);
    let companyItem = this.utils.createElement("li", [
      "list-group-item d-flex flex-grow-1 p-2 ",
    ]);
    let compareButton = new CompareButton(
      this.utils.createElement,
      company,
      this.callbackFunction
    ).button;
    let spanColor = this.utils.getColor(company.profile.changesPercentage);
    companyItem.innerHTML = `
                                <div class='d-flex flex-grow-1 p-1 align-items-center'>
                                    <img class='logo-companies'src=${company.profile.image} alt=${company.name}>
                                    <a href='./company.html?symbol=${company.symbol}'>   ${highlight.name} </a>
                                    <span>(${highlight.symbol}) </span>
                                    <span class=${spanColor}>${company.profile.changesPercentage} </span>
                                </div>
		                        `;
    companyItem.append(compareButton);
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
