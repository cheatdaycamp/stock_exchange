window.onload = (() => {
	const utils = new UtilsClass();
	const form = new CreateForm(utils);

	const { companiesList, marquee } = form.domElements;
	new Marquee(utils, marquee);

	const compareDiv = document.getElementById('compare-wrapper');
	const compareBox = new CompareBox(utils, compareDiv);
	const resultsList = new CreateResults(utils, companiesList, compareBox.addCompanies.bind(compareBox));

	const callbackFunction = resultsList.createCompaniesList.bind(resultsList);

	form.domElements.button.addEventListener('click', () => {
		form.launchSearch(callbackFunction);
	});
	var htmlElement = document.querySelector("html")
	htmlElement.classList.remove('d-none')
})();
