window.onload = (() => {
	const utils = new UtilsClass();
	const form = new CreateForm(utils);

	// object desestructuring
	const { companiesList } = form.domElements;
	const { companies } = form.companies;

	const marquee = document.getElementById('marquee');
	new Marquee(utils, marquee);

	const resultsList = new CreateResults(utils, companiesList);

	const callbackFunction = resultsList.createCompaniesList.bind(resultsList);

	form.domElements.button.addEventListener('click', () => {
		form.launchSearch(callbackFunction);
	});
})();
