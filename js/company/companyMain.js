window.onload = (async () => {
	const utils = new UtilsClass();
	let params = utils.getUrlParams('symbol');
	let arrayOfSymbols = params.split(',');

	let container = utils.createElement('div', ['border-2 container-fluid flex-column align-items-stretch flex-grow-1 h-100']);
	let row = utils.createElement('div', ['border-3 row d-flex flex-grow-1 align-items-stretch h-100']);
	row.innerHTML = `
					<div class = 'border-1 col d-flex flex-grow-1 justify-content-center flex-column'>
						<div class = 'rborder-2 row h-100 d-flex flex-grow-1 justify-content-center align-items-stretch'></div>
					</div>
					`;
	console.log(row)
	await arrayOfSymbols.forEach(async (symbol) => {
		let company = new CompanyCard(utils, symbol, row);
		await company.launchCardCreation();
	});
	container.append(row);
	document.body.prepend(container);
})();
