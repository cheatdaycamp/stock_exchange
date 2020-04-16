class CompanyCard {
	constructor(utils, symbol, row) {
		this.root = row; //dom element where everything is going to be appended.
		this.utils = utils; //object with functions
		this.company = {}; //company with all data
		this.symbol = symbol; //array of symbols from the url
	}

	launchCardCreation = async () => {
		await this.getCompanyfromLocalStorage();
		this.company.historical = await this.getDataChart();
		this.root.append(this.createCard());
	};

	getCompanyfromLocalStorage = async () => {
		let tryGrabFromStorage = this.utils.getCompaniesfromLocalStorage('COMPANIES');
		if (tryGrabFromStorage) {
			let company = tryGrabFromStorage.find((elem) => {
				return elem.symbol === this.symbol;
			});
			if (company) {
				return (this.company = company);
			}
		}
		let url = `https://financialmodelingprep.com/api/v3/company/profile/${this.symbol}`;
		this.company = await this.utils.fetchData(url);
	};

	createCard = () => {
		const company = this.company;
		const template = `
                <div class="m-3 card col-xs-11 col-sm-11 col-md-11 col-lg-5 col-xl-4 p-3 d-flex flex-column align-items-stretch">
                    <div class = 'container-fluid d-flex flex-column flex-grow-1 h-100'>
                        <div class = 'min-120px row d-flex flex-grow-1 justify-content-start align-items-center'>
                            <img src="${company.profile.image}" class="company-logo card-img-top" alt="${
			company.symbol
		}">
                            <div class="d-flex flex-column ml-2">
                                <h2>${company.profile.companyName}</h2>
                                <h3>${company.symbol}</h3>
                            </div>
                        </div>
                        <div class = 'row mt-3'>
                            <h5>Stock Price: $${company.profile.price}</h5>
                            <span class=${this.utils.getColor(company.profile.changesPercentage)}> ${
			company.profile.changesPercentage
		}
                            </span>
                            <p class="">${company.profile.description}</p>
                        </div>
                        <canvas id="myChart-${company.symbol}" class="chart-wrapper"></canvas>
                    </div>
                </div>
            `;
		let card = new DOMParser().parseFromString(template, 'text/html');
		card = card.getElementsByTagName('BODY')[0].firstChild;

		let dataForChart = this.filterChartData(this.company.historical);
		let a = card.getElementsByTagName('canvas');
		this.drawChart(dataForChart, a);
		return card;
	};

	getDataChart = async () => {
		let url = `https://financialmodelingprep.com/api/v3/historical-price-full/${this.company.symbol}?serietype=line`;
		let stockPrices = await this.utils.fetchData(url);
		return stockPrices;
	};

	filterChartData = (stockPrices) => {
		let amountData = stockPrices.historical.length - 20;
		let limitData = stockPrices.historical.length;
		let slicedData = stockPrices.historical.slice(amountData, limitData);
		let labels = [];
		let values = [];
		for (let price of slicedData) {
			labels.push(price.date);
			values.push(price.close);
		}
		return { labels: labels, values: values };
	};

	drawChart = (filteredChartData, ctx) => {
		let chart = new Chart(ctx, {
			type: `line`,
			data: {
				labels: filteredChartData.labels,
				datasets: [
					{
						label: `Stock Price History`,
						backgroundColor: `rgb(255, 99, 132)`,
						borderColor: `rgb(255, 99, 132)`,
						data: filteredChartData.values,
					},
				],
			},
			options: {},
		});
		return chart;
	};
}
