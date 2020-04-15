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
		this.domElements.rootDiv = createElement('div', ['border-1 root container-fluid']);
		this.domElements.row01 = createElement('div', ['row justify-content-center p-3 d-flex align-items-center mb-5']);
		this.domElements.marquee = createElement('div', ['row marquee shadow']);
		this.domElements.form = createElement('div', ['input-group mb-3']);
		this.domElements.logo = createElement('div', ['logo']);
		this.domElements.input = createElement('input', ['form-control']);
		this.domElements.innerDiv = createElement('div', ['input-group-append row']);
		this.domElements.button = createElement('button', ['btn btn-primary']);
		this.domElements.spinner = createElement('div', ['row justify-content-center d-none']);
		this.domElements.companiesList = createElement('div', ['row d-flex flex-grow-1 border-2']);
		this.domElements.compareDiv = createElement('div', ['row justify-content-around d-flex align-items-center mb-2']);
	};

	setAttributes = () => {
		const { input, button, spinner, marquee, compareDiv, companiesList } = this.domElements;
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
		compareDiv.id = 'compare-wrapper';
		companiesList.innerHTML = `<ul id='ulList' class='ulList p-0 m-0 d-flex flex-column col'></ul>`;
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
		this.domElements.button.addEventListener('click', this.launchSearch(callbackFunction));
	};

	launchSearch = async (callbackFunction, liFunction) => {
		const { spinner, input } = this.domElements;
		const { toggleHidde, fetchData } = this.utils;
		event.preventDefault();
		const url = `https://financialmodelingprep.com/api/v3/search?query=${input.value}&limit=10&exchange=NASDAQ`;
		toggleHidde(spinner);
		this.companies = await fetchData(url);
		this.companies = await this.createCompaniesList(this.companies);
		console.log('1', this.companies);
		callbackFunction(this.companies, input.value, liFunction);
		toggleHidde(spinner);
	};

	storeCompanies = () => {
		localStorage.setItem('COMPANIES', JSON.stringify(this.companies));
		return this.companies;
	};

	createCompaniesList = async (companies) => {
		const { clearElement, fetchData } = this.utils;
		let ulList = this.domElements.companiesList.firstChild;
		console.log(ulList);
		clearElement(ulList);
		return await Promise.all(
			companies.map(async (company) => {
				let url1 = `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`;
				company.profile = (await fetchData(url1)).profile;
				return company;
			})
		);
	};

	getColor = (string) => {
		let number = isNaN(parseFloat(string)) ? this.convToFloat(string) : parseFloat(string);
		if (number < 0) {
			return 'redFont';
		} else if (number > 0) {
			return 'greenFont';
		}
		return 'blackFont';
	};
}
