import { getConn } from 'src/dao/database'

const ORIGINS = {
    1: "Binance",
    2: "KuCoin"
}

const COLORS = {
    1: "#f6dd3b",
    2: "#3bf699"
}

export const getUsdPrices = async ({ from }) => {
    const conn = await getConn();
    let query;
    if (!from) {
        query = 'SELECT * FROM Prices';
    } else {
        try {
            if (from.includes("w")) {
                const interval = parseInt(from.replace("w", ""));
                query = `SELECT * FROM Prices WHERE date >= DATE_SUB(NOW(), INTERVAL ${interval} WEEK)`;
            } else if (from.includes("m")) {
                const interval = parseInt(from.replace("m", ""));
                query = `SELECT * FROM Prices WHERE date >= DATE_SUB(NOW(), INTERVAL ${interval} MONTH)`;
            }
        } catch (e) {
            console.log(e)
            return [];
        }
    }
    console.log({query, date: (new Date()).toLocaleString()});
    try {
        const res = await conn.query(query);
        const dates = new Set(res.map(e => { return new Date(e.Date).toLocaleString().replace(":00:00", "") }))
        let data = {
            dates: [...dates],
            items: []
        };
        const keys = Object.keys(ORIGINS);
        for (let i = 0; i < keys.length; i++) {
            const e = keys[i];
            const origin = parseInt(e)
            data.items.push({
                origin: ORIGINS[e],
                data: res.filter(e => e.IdOrigin === origin).map(e => { return { Date: new Date(e.Date).toLocaleString(), Price: e.Price } }),
                color: COLORS[e]
            })
        }

        if (conn) conn.release();
        return data;
    } catch (e) {
        console.log(e)
        return [];
    }
}