const utils = {
	getColor: function (string) {
		let number = isNaN(parseFloat(string)) ? this.convToFloat(string) : parseFloat(string);
		if (number < 0) {
			return 'redFont';
		} else if (number > 0) {
			return 'greenFont';
		}
		return 'blackFont';
	},

	convToFloat: (string) => {
		return parseFloat(string.substr(1)); //slices first character
	},

	fetchData: (url) => {
		return fetch(url).then((response) => response.json());
	},

	toggleHidde: (element) => {
		element.classList.toggle('d-none');
	},

	clearElement: (element) => {
		while (element.firstChild) {
			element.firstChild.remove();
		}
	},

	getUrlParams: (...param) => {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(...param);
	},

	getCompaniesfromLocalStorage: (name) => {
		return JSON.parse(localStorage.getItem(name));
	},

	checkColor: (boolean) => {
		return boolean ? 'red' : 'blue';
	},

	createElement: (elementType, classes) => {
		const element = document.createElement(`${elementType}`);
		classes.length === 1 ? (element.classList = classes) : element.classList.add(...classes);
		return element;
	},

	//checkSubstring = (input, phrase) => {
	//	let positions = [];
	//	for (let i = 0; i < phrase.length; i++) {
	//		let index = phrase.toLowerCase().indexOf(input.toLowerCase(), i);
	//		if (index !== -1) {
	//			let tupple = {};
	//			tupple.start = index;
	//			tupple.end = index + input.length - 1;
	//			positions.push(tupple);
	//			i = i + tupple.end;
	//		}
	//	}

	//	let search = phrase.toLowerCase().search(input.toLowerCase());
	//	let length = input.length;
	//	console.log(input, phrase, search, length, positions);
	//	return positions;
	//};

	//checkSubstring2 = (input, item) => {
	//	let positions = []; // [0, 12, 34, ]
	//	console.log(positions);
	//	//{indexStart: 0, Indexend:1}, {indexStart: 12, Indexend:13}
	//	for (let i = 0; i < item.length; i++) {
	//		let index = item.toLowerCase().indexOf(input.toLowerCase(), i);
	//		if (index !== -1) {
	//			//tupple.start = index;
	//			//tupple.end = index + input.length - 1;
	//			positions.push(index);
	//			i = i + input.length;
	//		}
	//	}
	//	console.log(positions);
	//	let spanString = '';
	//	for (let j = 0; j < positions.length; j++) {
	//		for (let k = 0; k < item.length; k++) {
	//			if (j === k && j === 0) {
	//				spanString += '<span class="yellow">';
	//				spanString += item[k];
	//			} else if (j === k) {
	//				spanString += '</span><span class="yellow">';
	//				spanString += item[k];
	//			} else {
	//				spanString += item[k];
	//			}
	//			if (j === k + input.length) {
	//				spanString += '</span>';
	//			}
	//		}
	//	}
	//	item.replace();
	//};
};
