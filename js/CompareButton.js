class CompareButton {
	constructor(createElementFunction, company) {
		this.createElement = createElementFunction;
		this.company = company;
		this.button;
		this.createButton();
	}

	createButton = () => {
		let compareButton = this.createElement('button', ['btn btn-primary ml-2']);
		compareButton.innerText = 'Compare';
		compareButton.addEventListener('click', () => {
			this.addElement(this.company);
		});
		this.button = compareButton;
	};

	addElement = (company) => {
		console.log(company);
	};
}
