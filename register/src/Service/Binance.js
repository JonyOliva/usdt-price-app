async function getPrices() {
    //identifier
    const ignoredMethods = ["CashDeposit", "CashInPerson", "SkrillMoneybookers", "NETELLER", "Wise", "Efecty"];
    let apiData = [];
    let end = false;
    let page = 1;
    const url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";
    while(!end) {
        const data = {
            "proMerchantAds": false,
            "page": page,
            "rows": 10,
            "payTypes": [],
            "countries": [],
            "publisherType": null,
            "asset": "USDT",
            "fiat": "ARS",
            "tradeType": "BUY"
        };
        const rawResp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(e => e.json());
        for (let x = 0; x < rawResp.data.length; x++) {
            const elem = rawResp.data[x];
            let tradeMethods = elem.adv.tradeMethods.filter(e => !ignoredMethods.includes(e.identifier));
            if(tradeMethods.length > 0){
                apiData.push(elem);
            }
            if(apiData.length >= 10){
                end = true;
                break;
            }
        }
        page++;
    }

    return {
        prices: apiData.map(e => e.adv.price),
        origin: 1
    }
}
module.exports = {
    getPrices
}