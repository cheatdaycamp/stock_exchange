class CompanyCard {
	constructor(utils) {
		this.root; //dom element where everything is going to be appended.
		this.utils = utils; //object with functions
		this.companies = []; //all the data from index.html
		this.symbols = []; //array of symbols from the url
		this.filteredCompanies = []; // array with the information from the companies
		this.launchCardCreation();
	}

	launchCardCreation = async () => {
		this.createRootElement();
		this.getSymbols();
		this.getCompaniesfromLocalStorage();
		this.filterCompanies();
		this.appendRootToBody();
		this.filteredCompanies.forEach((company) => {
			this.createCard(company);
		});
	};

	createRootElement = () => {
		let root = this.utils.createElement('div', ['h-100 container-fluid flex-grow-1 d-flex h-100 flex-column']);
		root.id = 'cards-root';
		root.innerHTML = `<div class="row d-flex h-100 flex-grow-1 justify-content-around my-4 "></div>`;
		this.root = root;
	};

	getSymbols = () => {
		let param = this.utils.getUrlParams('symbol');
		this.symbols = param.split(',');
	};

	getCompaniesfromLocalStorage = () => {
		let tryGrabFromStorage = this.utils.getCompaniesfromLocalStorage('COMPANIES');
		if (tryGrabFromStorage) {
			this.companies = tryGrabFromStorage;
		}
	};

	filterCompanies = () => {
		this.symbols.forEach(async (param) => {
			let url = `https://financialmodelingprep.com/api/v3/company/profile/${param}`;
			let filterCompany;
			if (this.companies) {
				filterCompany = this.companies.find((company) => company.symbol === param);
			}
			if (filterCompany && filterCompany.symbol) {
				this.filteredCompanies.push(filterCompany);
				this.createCard(filterCompany);
			} else {
				console.warn(`Company with symbol: ${param} doesn't exist in COMPANIES local storage. Fetching from API.`);
				let filterCompany = await this.utils.fetchData(url);
				this.filteredCompanies.push(filterCompany);
				this.createCard(filterCompany);
			}
		});
	};

	createCard = async (company) => {
		//const values = await this.getChart(company);
		const card = `
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
		document.getElementById(`cards-root`).firstChild.insertAdjacentHTML('beforeend', card);
		let companyHistorical = await this.getDataChart(company);
		let dataForChart = this.filterChartData(companyHistorical);
		let a = document.getElementById(`myChart-${company.symbol}`);
		this.drawChart(dataForChart, a);
	};

	appendRootToBody = () => {
		document.body.prepend(this.root);
	};

	getDataChart = async (company) => {
		let url = `https://financialmodelingprep.com/api/v3/historical-price-full/${company.symbol}?serietype=line`;
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
