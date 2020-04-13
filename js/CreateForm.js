class CreateForm {
	constructor(utils) {
		this.utils = utils;
		this.domElements = {}; // store the dom elements
		this.companies = []; // store fetched data mapped
		this.createElements();
		this.setAttributes();
		this.appendElements();
		//this.setEventsListeners();
	}

	createElements = () => {
		const { createElement } = this.utils;
		this.domElements.rootDiv = createElement('div', ['root', 'container-fluid']);
		this.domElements.row01 = createElement('div', ['row justify-content-center p-3 d-flex align-items-center mb-1']);
		this.domElements.marquee = createElement('div', ['row marquee shadow']);
		this.domElements.form = createElement('div', ['input-group mb-3']);
		this.domElements.logo = createElement('div', ['logo']);
		this.domElements.input = createElement('input', ['form-control']);
		this.domElements.innerDiv = createElement('div', ['input-group-append']);
		this.domElements.button = createElement('button', ['btn btn-primary']);
		this.domElements.spinner = createElement('div', ['row justify-content-center d-none']);
		this.domElements.companiesList = createElement('ul', ['row ulList']);
		this.domElements.compareDiv = createElement('div', [
			'd-none border-3 row justify-content-end align-items-center mb-3 px-3',
		]);
	};

	setAttributes = () => {
		const { input, button, spinner, marquee, compareDiv } = this.domElements;
		button.textContent = 'Search Stock';
		input.id = 'searchStock';
		marquee.innerHTML = `<div class='col-12'>
						<div class='marquee-wrapper'>
							<div id='marquee' class='text-nowrap'></div>
						</div>
					</div>`;
		input.setAttribute('type', 'text');
		spinner.innerHTML = `<div id='spinner' class="spinner-border text-black" role="status">
        <span class="sr-only">Loading...</span>
        </div>`;
		compareDiv.id = 'compare-div';
	};

	appendElements = () => {
		const {
			input,
			button,
			spinner,
			innerDiv,
			row01,
			form,
			companiesList,
			rootDiv,
			logo,
			marquee,
			compareDiv,
		} = this.domElements;
		row01.append(logo);
		innerDiv.append(button);
		form.append(input, innerDiv);
		rootDiv.append(marquee, row01, compareDiv, form, spinner, companiesList);
		document.body.prepend(rootDiv);
	};

	setEventsListeners = () => {
		const { button } = this.domElements;
		button.addEventListener('click', this.launchSearch(callbackFunction));
	};

	launchSearch = async (callbackFunction) => {
		const { spinner, input } = this.domElements;
		const { toggleHidde, fetchData } = this.utils;
		event.preventDefault();
		this.updateQuery();
		const url = `https://financialmodelingprep.com/api/v3/search?query=${input.value}&limit=10&exchange=NASDAQ`;
		toggleHidde(spinner);
		this.companies = await fetchData(url);
		this.companies = await this.createCompaniesList(this.companies);
		callbackFunction(this.companies, input.value);
		toggleHidde(spinner);
		//this.storeCompanies();
	};

	updateQuery = () => {
		const { input } = this.domElements;
		let newSearch = this.updateQueryStringParameter(window.location.href, 'search', input.value);
		if (newSearch !== window.location.href) {
			window.history.replaceState('', '', newSearch);
		}
	};

	updateQueryStringParameter = (uri, key, value) => {
		var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
		var separator = uri.indexOf('?') !== -1 ? '&' : '?';
		if (uri.match(re)) {
			return uri.replace(re, '$1' + key + '=' + value + '$2');
		} else {
			return uri + separator + key + '=' + value;
		}
	};

	storeCompanies = () => {
		localStorage.setItem('COMPANIES', JSON.stringify(this.companies));
		return this.companies;
	};

	createCompaniesList = async (companies) => {
		const { clearElement, fetchData } = this.utils;
		clearElement(this.domElements.companiesList);
		return await Promise.all(
			companies.map(async (company) => {
				let url = `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`;
				company.profile = (await fetchData(url)).profile;
				return company;
			})
		);
	};
}
