import {getUsdPrices} from 'src/dao/usdtPrices';

export default async function handler(req, res) {
  if(req.method == 'GET') {
    const from = req.query.from;
    const prices = await getUsdPrices({from});
    res.status(200).json(prices);
  }else{
    res.status(405).json({ error: 'Method not allowed' })
  }
}
