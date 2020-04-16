class CreateForm {
  constructor(utils) {
    this.utils = utils;
    this.domElements = {}; // store the dom elements
    this.companies = []; // store fetched data mapped
    this.createElements();
    this.setAttributes();
    this.appendElements();
    this.setEventsListeners();
  }

  grabQuery = (callbackFunction) => {
    console.log("here");
    let search = this.utils.getUrlParams("search");
    console.log(search);
    if (search) {
      this.domElements.input.value = search;
      this.launchSearch(callbackFunction);
    }
  };

  createElements = () => {
    const { createElement } = this.utils;
    this.domElements.rootDiv = createElement("div", [
      "root container-fluid h-100",
    ]);
    this.domElements.row01 = createElement("div", [
      "row justify-content-center d-flex align-items-center mb-5",
    ]);
    this.domElements.marquee = createElement("div", ["row marquee shadow"]);
    this.domElements.form = createElement("div", [
      "row justify-content-center d-flex align-items-center mb-3",
    ]);
    this.domElements.logo = createElement("div", [
      "col d-flex flex-column align-items-center",
    ]);
    this.domElements.input = createElement("input", ["form-control"]);
    this.domElements.button = createElement("button", [
      "btn btn-primary ml-3 text-nowrap",
    ]);
    this.domElements.spinner = createElement("div", [
      "row justify-content-center d-none",
    ]);
    this.domElements.companiesList = createElement("div", [
      "row d-flex flex-grow-1 justify-content-center",
    ]);
    this.domElements.compareDiv = createElement("div", [
      "row justify-content-around d-flex align-items-center mb-2",
    ]);
  };

  setAttributes = () => {
    const {
      input,
      button,
      spinner,
      compareDiv,
      companiesList,
      logo,
      form,
    } = this.domElements;
    button.textContent = "Search Stock";
    input.id = "searchStock";
    input.setAttribute("type", "text");
    form.innerHTML = `
							<div class= 'card shadow col-xl-7 col-md-9 col-lg-7 col-sm-11 p-3 align-items-center flex-row'>
								<div class = 'd-flex flex-grow-1'></div>
							</div>`;
    spinner.innerHTML = `<div id='spinner' class="spinner-border text-black" role="status">
        <span class="sr-only">Loading...</span>
        </div>`;
    compareDiv.id = "compare-wrapper";
    companiesList.innerHTML = `<ul id='ulList' class='list-group card col-xl-7 col-md-9 col-lg-7 col-sm-11 shadow p-0 justify-content-center d-none'></ul>`;
    logo.innerHTML = `<div class='logo my-3'></div>`;
  };

  appendElements = () => {
    const {
      input,
      button,
      spinner,
      row01,
      form,
      companiesList,
      rootDiv,
      logo,
      marquee,
      compareDiv,
    } = this.domElements;
    row01.append(logo);
    form.getElementsByClassName("d-flex flex-grow-1")[0].append(input, button);
    rootDiv.append(marquee, row01, compareDiv, form, spinner, companiesList);
    document.body.prepend(rootDiv);
  };

  setEventsListeners = () => {
    // this.domElements.button.addEventListener(
    //   "click",
    //   this.launchSearch(callbackFunction)
    // );
  };

  launchSearch = async (callbackFunction) => {
    console.log("gere");
    const { spinner, input, companiesList } = this.domElements;
    const { toggleHidde, fetchData } = this.utils;
    if (!companiesList.firstChild.classList.contains("d-none")) {
      toggleHidde(companiesList.firstChild);
    }
    this.updateQuery();
    const url = `https://financialmodelingprep.com/api/v3/search?query=${input.value}&limit=10&exchange=NASDAQ`;
    toggleHidde(spinner);
    this.companies = await fetchData(url);
    this.companies = await this.createCompaniesList(this.companies);
    this.storeCompanies();
    callbackFunction(this.companies, input.value);
    toggleHidde(spinner);
    toggleHidde(companiesList.firstChild);
  };

  storeCompanies = () => {
    localStorage.setItem("COMPANIES", JSON.stringify(this.companies));
    return this.companies;
  };

  updateQuery = () => {
    const { input } = this.domElements;
    let newAdress = document.location.pathname + "?search=" + input.value;
    window.history.replaceState("", "", "");
    window.history.replaceState("", "", newAdress);
  };

  createCompaniesList = async (companies) => {
    const { clearElement, fetchData } = this.utils;
    let ulList = this.domElements.companiesList.firstChild;
    clearElement(ulList);
    return await Promise.all(
      companies.map(async (company) => {
        let url1 = `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`;
        company.profile = (await fetchData(url1)).profile;
        return company;
      })
    );
  };

  debounce(f, t){
    return function (args) {
      let previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (!previousCall || this.lastCall - previousCall > t) {
        f(args);
      }
    };
  };

  getColor = (string) => {
    let number = isNaN(parseFloat(string))
      ? this.convToFloat(string)
      : parseFloat(string);
    if (number < 0) {
      return "redFont";
    } else if (number > 0) {
      return "greenFont";
    }
    return "blackFont";
  };
}
