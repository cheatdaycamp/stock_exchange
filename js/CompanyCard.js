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
			this.filteredCompanies = this.companies.filter((company) => company.symbol === param);
		}
	};

	createCard = (company) => {
		let root = this.utils.createElement('div', ['h-100 container-fluid flex-grow-1 d-flex h-100 flex-column']);
		root.innerHTML = `<div class="row d-flex h-100 flex-grow-1 justify-content-center my-4 "></div>`;
		console.log(root.firstChild);
		company.forEach(async (company, index) => {
			const card = `
                    <div class="card col-12 col-md-8 col-lg-5 p-3 d-flex flex-column">
                        <div class = 'container-fluid d-flex flex-column flex-grow-1 h-100'>
                            <div class = 'row d-flex flex-grow-1 justify-content-start align-items-center'>
                                <img src="${company.newData.image}" class="company-logo card-img-top" alt="${
				company.symbol
			}">
                                <div class="d-flex flex-column ml-2">
                                    <h2>${company.name}</h2>
                                    <h3>${company.symbol}</h3>
                                </div>
                            </div>
                            <div class = 'row mt-3'>
                                <h5>Stock Price: $${company.newData.price}</h5>
                                <span class=${this.utils.getColor(company.newData.changesPercentage)}> ${
				company.newData.changesPercentage
			}
                                </span>
                                <p class="">${company.newData.description}</p>
                            </div>
                            <div id="myChart-${company.symbol}" class="chart-wrapper"></div>

                        </div>
                    </div>

             `;
			//const values = await this.getChart(company);
			//this.drawChart(card.getElementById('myChart'));
			root.firstChild.insertAdjacentHTML('beforeend', card);
		});
		document.body.prepend(root);
	};
	getChart = async (company) => {
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

	drawChart = (object) => {
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
