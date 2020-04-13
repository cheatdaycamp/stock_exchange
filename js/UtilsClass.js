class UtilsClass {
	getColor = (string) => {
		let number = isNaN(parseFloat(string)) ? this.convToFloat(string) : parseFloat(string);
		if (number < 0) {
			return 'redFont';
		} else if (number > 0) {
			return 'greenFont';
		}
		return 'blackFont';
	};

	convToFloat = (string) => {
		return parseFloat(string.substr(1)); //slices first character
	};

	fetchData = (url) => {
		return fetch(url).then((response) => response.json());
	};

	toggleHidde = (element) => {
		element.classList.toggle('d-none');
	};
	toggleClass = (element, className) => {
		element.classList.toggle(className);
	};

	clearElement = (element) => {
		while (element.firstChild) {
			element.firstChild.remove();
		}
	};

	getUrlParams = (...param) => {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(...param);
	};

	getCompaniesfromLocalStorage = (name) => {
		return JSON.parse(localStorage.getItem(name));
	};

	checkColor = (boolean) => {
		return boolean ? 'red' : 'blue';
	};

	createElement = (elementType, classes) => {
		const element = document.createElement(`${elementType}`);
		classes.length === 1 ? (element.classList = classes) : element.classList.add(...classes);
		return element;
	};
}
