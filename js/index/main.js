window.onload = (() => {
  const utils = new UtilsClass();
  const form = new CreateForm(utils);
  const {
    companiesList,
    marquee,
    compareDiv,
    button,
    input,
  } = form.domElements;

  new Marquee(utils, marquee);
  const compareBox = new CompareBox(utils, compareDiv);
  const resultsList = new CreateResults(
    utils,
    companiesList,
    compareBox.addCompanies.bind(compareBox)
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
