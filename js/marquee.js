class Marquee {
	constructor(utils, parent) {
		this.utils = utils;
		this.parent = parent;
		this.prices; // storing the fetch
		console.log(this.parent);
		this.launchMarquee();
	}

	async launchMarquee() {
		const url = `https://financialmodelingprep.com/api/v3/stock/real-time-price`;
		this.prices = await this.utils.fetchData(url);
		this.createMarquee();
	}

	createMarquee() {
		for (let i = 0; i < 1000; i++) {
			const company = this.prices.stockList[i];
			const stockItem = `<span>| ${company.symbol} </span><span class="text-success">${company.price} </span>`;
			this.parent.insertAdjacentHTML(`beforeend`, stockItem);
		}
	}
}
