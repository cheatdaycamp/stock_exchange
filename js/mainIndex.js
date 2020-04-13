window.onload = (() => {
	const utils = new UtilsClass();
	const form = new CreateForm(utils);

	const marquee = document.getElementById('marquee');
	new Marquee(utils, marquee);

	const { companiesList } = form.domElements;

	const compareDiv = new CompareCreator(utils, document.getElementById('compare-div'));
	const compareButtonFC = compareDiv.addSymbol.bind(compareDiv);

	const resultsList = new CreateResults(utils, companiesList, compareButtonFC);

	const callbackFunction = resultsList.createCompaniesList.bind(resultsList);

	form.domElements.button.addEventListener('click', () => {
		form.launchSearch(callbackFunction);
	});
})();
