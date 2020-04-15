class CompareButton {
	constructor(createElementFunction, company, callbackFunction) {
		this.createElement = createElementFunction;
		this.company = company;
		this.button;
		this.createButton();
		this.callbackFunction = callbackFunction;
	}

	createButton = () => {
		let compareButton = this.createElement('button', ['btn btn-primary']);
		compareButton.innerText = 'Compare';
		compareButton.addEventListener('click', () => {
			this.addElement();
		});
		this.button = compareButton;
	};

	addElement = () => {
		console.log(this.company);
		this.callbackFunction(this.company);
	};
}
