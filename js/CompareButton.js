class CompareButton {
	constructor(createElementFunction, company, callbackFunction) {
		this.createElement = createElementFunction;
		this.company = company;
		this.button;
		this.callbackFunction = callbackFunction;
		this.createButton();
	}

	createButton = (callbackFunction) => {
		let compareButton = this.createElement('button', ['btn btn-primary ml-2']);
		compareButton.innerText = 'Compare';
		compareButton.addEventListener('click', () => {
			this.addElement(this.company);
			this.callbackFunction(this.company);
		});
		this.button = compareButton;
	};

	addElement = (company) => {
		console.log(company);
	};
}
