class CompanyCard {
	constructor(utils, symbol, row) {
		this.root = row; //dom element where everything is going to be appended.
		this.utils = utils; //object with functions
		this.company = {};
		this.symbol = symbol; //array of symbols from the url
		this.filteredCompanies = []; // array with the information from the companies
	}

	launchCardCreation = async () => {
		this.getCompaniesfromLocalStorage();
		let caca = await this.filterCompanies();
		//await this.print(caca);
		//let cucu = await this.filteredCompanies;
		//await this.print();
		//let caca = this.filteredCompanies;

		console.log(this.filteredCompanies);
		this.appendRootToBody();
	};

	print = async (caca) => {
		console.log('ínside print');
		console.log(caca.length);
		for (let company of caca) {
			console.log(typeof company);
		}
		console.log('cant print');
	};

	getCompaniesfromLocalStorage = () => {
		console.log('grabb');
		let tryGrabFromStorage = this.utils.getCompaniesfromLocalStorage('COMPANIES');
		if (tryGrabFromStorage) {
			let company = tryGrabFromStorage.find((elem) => {
				elem.symbol === this.symbol;
			});
			if (company) {
				this.company = company;
			}
		}
		console.log(this.company);
	};

	filterCompanies = async () => {
		console.log('filtering');
		let filteredCompanies = [];
		let url = `https://financialmodelingprep.com/api/v3/company/profile/${this.symbol}`;
		let filterCompany;

		if (this.company) {
			filterCompany = this.companies.find((company) => company.symbol === param);
		}
		if (filterCompany && filterCompany.symbol) {
			filteredCompanies.push(filterCompany);
			//this.createCard(filterCompany);
		} else {
			//console.warn(`Company with symbol: ${param} doesn't exist in COMPANIES local storage. Fetching from API.`);
			let filterCompany = await this.utils.fetchData(url);
			filteredCompanies.push(filterCompany);
			//this.createCard(filterCompany);
		}

		console.log(filteredCompanies);
		return filteredCompanies;
	};

	createCard = async (company) => {
		const template = `
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
		let card = new DOMParser().parseFromString(template, 'text/html');
		card = card.getElementsByTagName('BODY')[0].firstChild;

		//let dataForChart = this.filterChartData(companyHistorical);

		//let companyHistorical = await this.getDataChart(company);
		//let a = document.getElementById(`myChart-${company.symbol}`);
		//this.drawChart(dataForChart, a);
		//this.root.firstChild.prepend(card);
	};

	appendRootToBody = () => {
		document.body.prepend(this.root);
	};

	getDataChart = async (company) => {
		console.log(`getting data chart for ${company.symbol}`);
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
