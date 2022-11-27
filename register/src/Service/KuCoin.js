async function getPrices(){
    const url = 'https://www.kucoin.com/_api/otc/ad/list?currency=USDT&side=SELL&legal=ARS&page=1&pageSize=15&status=PUTUP&lang=es_ES';
    const rawResp = await fetch(url).then(e => e.json());
    const prices = rawResp.items.map(e => e.floatPrice);
    return {
      prices,
      origin: 2
    };
}

module.exports = {
    getPrices
}