window.onload = (() => {
	const utils = new UtilsClass();
	const form = new CreateForm(utils);

	// object desestructuring
	const { companiesList } = form.domElements;
	const { companies } = form.companies;

	const marquee = document.getElementById('marquee');
	new Marquee(utils, marquee);

	const compareDiv = document.getElementById('compare-wrapper');
	const compareBox = new CompareBox(utils, compareDiv);
	const resultsList = new CreateResults(utils, companiesList, compareBox.addCompanies.bind(compareBox));

	const callbackFunction = resultsList.createCompaniesList.bind(resultsList);

	form.domElements.button.addEventListener('click', () => {
		form.launchSearch(callbackFunction);
	});
})();
