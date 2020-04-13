class CompanyInfo {
	constructor(utils, parent, symbol) {
		this.utils = utils; //object with functions
		this.parent = parent;
		this.symbol = symbol; //array of symbols from the url
		this.root; //dom element where everything is going to be appended.
		this.company; // the company info
		this.companyHistorical; // the historical prices for the data
		this.card; // the whole card
		this.launchCardCreation();
	}

	launchCardCreation = async () => {
		this.createRootElement();
		await this.fetchCompany();
		await this.fetchHistoricalPrices();
		this.createCard(this.company);
		this.appendElementToRoot(this.card);
		this.appendRootToParent();
	};

	createRootElement = () => {
		let root = this.utils.createElement('div', ['h-100 container-fluid flex-grow-1 d-flex h-100 flex-column']);
		root.innerHTML = `<div class="row d-flex h-100 flex-grow-1 justify-content-around my-4 "></div>`;
		root.id = 'cards-root';
		this.root = root;
	};

	fetchCompany = async () => {
		let url = `https://financialmodelingprep.com/api/v3/company/profile/${this.symbol}`;
		this.company = await this.utils.fetchData(url);
	};

	fetchHistoricalPrices = async () => {
		let url = `https://financialmodelingprep.com/api/v3/historical-price-full/${this.symbol}?serietype=line`;
		this.companyHistorical = await this.utils.fetchData(url);
	};

	createCard = () => {
		const company = this.company;
		const htmlString = `
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

		let card = new DOMParser().parseFromString(htmlString, 'text/html');
		card = card.getElementsByTagName('BODY')[0].firstChild;
		console.log(card);

		this.root.firstChild.prepend(card);
		let dataForChart = this.filterChartData(this.companyHistorical);
		let a = card.getElementsByTagName('canvas');
		this.drawChart(dataForChart, a);
		return card;
	};

	appendElementToRoot = (element) => {
		this.root.append(element);
	};

	appendRootToParent = () => {
		document.body.prepend(this.root);
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
