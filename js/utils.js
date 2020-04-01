const UTILS = {
	getColor: function(string) {
		let number = isNaN(parseFloat(string)) ? this.convToFloat(string) : parseFloat(string);
		if (number < 0) {
			return 'redFont';
		} else if (number > 0) {
			return 'greenFont';
		}
		return 'blackFont';
	},

	convToFloat: string => {
		return parseFloat(string.substr(1)); //slices first character
	},

	fetchData: url => {
		return fetch(url).then(response => response.json());
	},

	returnCompanies: () => {
		localStorage.setItem('COMPANIES', JSON.stringify(this.companies));
		return this.companies;
	},

	toggleHidde: element => {
		element.classList.toggle('d-none');
	},

	clearElement: element => {
		while (element.firstChild) {
			element.firstChild.remove();
		}
	},

	getUrlParams: (...param) => {
		console.log('here');
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(...param);
	},

	getCompaniesfromLocalStorage: name => {
		return JSON.parse(localStorage.getItem(name));
    }
    
    returnColorFunction : boolean => {
		if (boolean) return 'red';
		else return 'blue';
	};

};
