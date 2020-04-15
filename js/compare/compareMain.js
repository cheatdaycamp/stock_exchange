window.onload = (() => {
	// get the query params.
	let params = new URLSearchParams(window.location.search);
	let symbolParam = params.get('symbol');
	
	let arrayOfSymbols = symbolParam.split(',');
	let utils = new UtilsClass();

	let container = utils.createElement('div', ['container-fluid flex-column p-0 h-100']);
	let row = utils.createElement('main', ['row d-flex justify-content-around align-items-center h-100']);

	arrayOfSymbols.forEach((symbol) => {
		new CompareCard(utils, symbol, row);
	});
	container.append(row);
	document.body.prepend(container);
})();
