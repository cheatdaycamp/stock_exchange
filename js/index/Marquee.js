class Marquee {
  constructor(utils, parent) {
    this.utils = utils;
    this.parent = parent;
    this.progressValue = 0;
    this.prices; // storing the fetch
    this.createDivs();
    this.launchMarquee();
  }
  createDivs = () => {
    console.log(this.parent);
    let content = this.utils.createElement("div", [`col-12`]);
    content.innerHTML = `
						<div class='col-12'>
							<div class='loader'>Loading Marquee...</div>
							<div class='marquee-wrapper'>
								<div id='marquee' class='text-nowrap'></div>
							</div>
						</div>
						`;
    this.content = content;
    this.parent.append(this.content);
  };

  launchMarquee = async () => {
    const url = `https://financialmodelingprep.com/api/v3/stock/real-time-price`;
    this.prices = await this.utils.fetchData(url);
    this.createMarquee();
  };
  createMarquee = async () => {
	let wrapper = this.content.getElementsByClassName('text-nowrap')[0]

    for (let i = 0; i < 1000; i++) {
      const company = this.prices.stockList[i];
      const stockItem = `<span>| ${company.symbol} </span><span class="text-success">${company.price} </span>`;
      wrapper.insertAdjacentHTML(`beforeend`, stockItem);
	}
	let loader = this.content.getElementsByClassName(`loader`)[0]
    loader.classList.add("d-none");
  };
}
