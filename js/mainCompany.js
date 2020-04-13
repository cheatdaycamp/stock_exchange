window.onload = (() => {
	const utils = new UtilsClass();
	new CompanyInfo(utils);
	const params = new URLSearchParams(location.search);
	const symbol = params.get('symbol');
	const compInfo = new CompanyInfo(utils, document.body, symbol);
})();
