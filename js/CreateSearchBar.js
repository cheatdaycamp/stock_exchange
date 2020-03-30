class CreateSearchBar {
	constructor(parent) {
		this.domElements = {};
		this.loadElements();
	}

	createElement = (elementType, classes) => {
		let element = document.createElement(`${elementType}`);
		classes.length === 1 ? (element.classList = classes) : element.classList.add(...classes);
		return element;
	};

	loadElements = () => {
		this.createElements();
		this.appendElements();
	};
	createElements = () => {
		this.domElements.rootDiv = this.createElement('div', ['root', 'container-fluid', 'justify-content-around']);
		this.domElements.row01 = this.createElement('div', ['spacer', 'row']);
		this.domElements.form = this.createElement('form', ['row d-flex justify-content-around align-items-center']);
		this.domElements.innerDiv = this.createElement('div', ['form-group mb-0 d-flex align-items-center col']);
		this.domElements.input = this.createElement('input', ['d-flex form-control mr-3']);
		this.domElements.input.id = 'searchStock';
		this.domElements.button = this.createElement('button', ['btn btn-primary']);
		this.domElements.button.innerText = 'Search Stock';
		console.log(this.domElements);
	};

	appendElements = () => {
		this.domElements.innerDiv.append(this.domElements.input, this.domElements.button);
		this.domElements.form.append(this.domElements.innerDiv);
		this.domElements.rootDiv.append(this.domElements.row01, this.domElements.form);
		document.body.prepend(this.domElements.rootDiv);
	};

	print() {
		console.log('hola');
	}
}
