window.onload = (() => {
  const API = `ed93f3e229380c530b7a0e7663f86b99`;
  const utils = new UtilsClass();
  const form = new CreateForm(utils, API);
  const {
    companiesList,
    marquee,
    compareDiv,
    button,
    input,
  } = form.domElements;

  new Marquee(utils, marquee, API);
  const compareBox = new CompareBox(utils, compareDiv, API);
  const resultsList = new CreateResults(
    utils,
    companiesList,
    compareBox.addCompanies.bind(compareBox),
    API
  );

  form.grabQuery(resultsList.createCompaniesList.bind(resultsList));
  button.addEventListener("click", () => {
    form.launchSearch(resultsList.createCompaniesList.bind(resultsList));
  });

  input.addEventListener("keydown", () => {
    console.log(input.value);
    form.debounce(
      form.launchSearch(resultsList.createCompaniesList.bind(resultsList)),
      3
    );
  });

  const htmlElement = document.querySelector("html");
  htmlElement.classList.remove("d-none");
})();
