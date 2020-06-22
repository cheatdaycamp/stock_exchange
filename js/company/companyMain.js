window.onload = (async () => {
  const API = `ed93f3e229380c530b7a0e7663f86b99`;
  const utils = new UtilsClass();
  let params = utils.getUrlParams("symbol");
  let arrayOfSymbols = params.split(",");

  let container = utils.createElement("div", [
    "container-fluid flex-column h-100",
  ]);
  let row = utils.createElement("div", ["row justify-content-center h-100"]);

  await arrayOfSymbols.forEach(async (symbol) => {
    let company = new CompanyCard(utils, symbol, row, API);
    await company.launchCardCreation();
  });
  container.append(row);
  document.body.prepend(container);
})();
