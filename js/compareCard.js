class CompareCard {
	constructor(utils, symbol, parent) {
		this.utils = utils;
		this.symbol = symbol;
		this.parent = parent;
		this.company;
		this.companyHistorical;
		this.launchCardCreation();
	}

	launchCardCreation = async () => {
		let url1 = `https://financialmodelingprep.com/api/v3/company/profile/${this.symbol}`;
		let url2 = `https://financialmodelingprep.com/api/v3/historical-price-full/${this.symbol}?serietype=line`;

		this.company = await this.utils.fetchData(url1);
		this.companyHistorical = await this.utils.fetchData(url2);
		this.createCard();
	};

	createCard = async () => {
		const company = this.company;
		let card = `
                <div class="card col-12 col-md-8 col-lg-5 p-3 d-flex flex-column">
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

		card = new DOMParser().parseFromString(card, 'text/html');
		card = card.getElementsByTagName('body')[0].firstChild;

		let dataForChart = this.filterChartData(this.companyHistorical);
		let canvas = card.getElementsByTagName('canvas');
		this.drawChart(dataForChart, canvas);
		this.parent.append(card);
	};

	filterChartData = (stockPrices) => {
		let jump = parseInt(stockPrices.historical.length / 40);
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
