window.onload = (() => {
	const utils = new UtilsClass();
	const formDom = new CreateForm(utils);
	const { companiesList, marquee } = formDom.domElements;
	const marquee2 = document.getElementById('marquee');
	console.log(marquee2);

	new Marquee(utils, marquee2);
	const { companies } = formDom.companies;
	const resultsList = new CreateResults(utils, companiesList, companies);
})();
