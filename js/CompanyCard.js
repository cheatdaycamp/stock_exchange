class CompanyCard {
	constructor(utils) {
		this.utils = utils;
		this.companies;
		this.filteredCompanies;
		this.launchCardCreation();
	}

	launchCardCreation = () => {
		this.getCompanies();
		console.log(this.filteredCompanies);
		this.createCard(this.filteredCompanies);
	};

	getCompanies = async () => {
		let param = this.utils.getUrlParams('symbol');
		let url = `https://financialmodelingprep.com/api/v3/company/profile/${param}`;
		console.log(param, url);
		this.companies = this.utils.getCompaniesfromLocalStorage('COMPANIES');
		if (!this.companies) {
			this.filteredCompanies = await this.utils.fetchData(url);
		} else {
			this.filteredCompanies = this.companies.filter(company => company.symbol === param);
		}
	};

	createCard = company => {
		company.forEach(async company => {
			const card = `
            <div class="root container-fluid">
            <div class="row justify-content-center mt-5">
            <div class="card col-6" style="width: 18rem;">
            <img src="${company.newData.image}" class="card-img-top" alt="${company.symbol}">
            <div class="card-body">
            <h3>${company.name}</h3>
            <h4>${company.symbol}</h4>
            <h5>Stock Price: $${company.newData.price}
            <span class=${this.utils.getColor(company.newData.changesPercentage)}>
            ${company.newData.changesPercentage}
            </span>
            </h5>
            <p class="card-text">${company.newData.description}</p>
            </div>
            </div>
            </div>
            <div id="myChart" class="row justify-content-center mt-5"></div>
            </div>
             `;
			document.body.innerHTML += card;
			const values = await this.getChart(company);
			console.log('viva', values);
			this.drawChart(values);
		});
	};
	getChart = async company => {
		let url = `https://financialmodelingprep.com/api/v3/historical-price-full/${company.symbol}?serietype=line`;
		let stockPrices = await this.utils.fetchData(url);
		console.log(stockPrices);
		let jump = parseInt(stockPrices.historical.length / 40);
		console.log(stockPrices.historical.length, jump);
		let amountData = stockPrices.historical.length - 20;
		let limitData = stockPrices.historical.length;
		let slicedData = stockPrices.historical.slice(amountData, limitData);
		let labels = [];
		let values = [];
		console.log(slicedData);
		for (let price of slicedData) {
			labels.push(price.date);
			values.push(price.price);
		}
		console.log(values.length, labels.length);
		return { labels: labels, values: values };
	};

	drawChart = object => {
		//    var newChart = new Chart(document.getElementById('myChart').getContext('2d')),
		//        {
		//            type: 'line'
		//			data: {
		//				labels: object.labels,
		//				datasets: [
		//					{
		//						label: 'My Second dataset',
		//						fillColor: 'rgba(151,187,205,0.2)',
		//						strokeColor: 'rgba(151,187,205,1)',
		//						pointColor: 'rgba(151,187,205,1)',
		//						pointStrokeColor: '#fff',
		//						pointHighlightFill: '#fff',
		//						pointHighlightStroke: 'rgba(151,187,205,1)',
		//						data: object.values
		//					}
		//				]
		//			},
		//			options: {}
		//		};
	};
	filterCompanies = () => {};
}
