import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    parsing: {
        yAxisKey: 'Price',
        xAxisKey: 'Price'
    },
    maintainAspectRatio : false,
    scales: {
        x: {
            grid: {
                color: "#16181A"
            }
        },
        y: {
            grid: {
                color: "#16181A"
            }
        }
    },
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: "#ECEDEE"
            }
        },
        title: {
            display: true,
            text: 'Historico de precio ARS/USDT',
            color: "#ECEDEE"
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    //console.log(context)
                    return "Precio ARS$" + context.raw.Price;
                },
                title: function (context) {
                    return context[0].raw.Date;
                },
            }
        }
    }
};

export default function PriceChart({ usdtPrices }) {
    console.log(usdtPrices)
    if(usdtPrices?.err) return null;

    const datasets = usdtPrices.items.map((e) => {
        return {
            label: e.origin,
            data: e.data,
            fill: false,
            borderColor: e.color,
        }
    });
    const data = {
        labels: [...usdtPrices.dates].map((e, i) => (i % 4 === 0) ? e : ""),
        datasets: datasets
    };
    return <Line options={options} data={data} />
}
