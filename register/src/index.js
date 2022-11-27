const knex = require('./database.js');
const binance = require('./Service/Binance.js');
const kucoin = require('./Service/KuCoin.js');

(async () => {
  const dataSource = await Promise.all([
    binance.getPrices(),
    kucoin.getPrices()
  ])

  for (let i = 0; i < dataSource.length; i++) {
    const source = dataSource[i];
    let precioPromedio = 0;
    try {
      precioPromedio = source.prices.reduce((prev, next) => { return parseFloat(next) + prev }, 0) / source.prices.length;
    } catch (e) {

    }
    let date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);
    await knex.insert({
      Date: date.toISOString().slice(0, 19).replace('T', ' '),
      Price: precioPromedio,
      IdOrigin: source.origin
    }).into("Prices");
  }
  process.exit();
})();