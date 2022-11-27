import Head from 'next/head'
import { Button, Grid } from '@nextui-org/react';
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import PriceChart from 'src/components/PriceChart'
import HomeNavBar from 'src/components/Navbar/Navbar'

export default function Home({ usdtPrices }) {
  const [chartData, setChartData] = useState(usdtPrices)

  const fetchPrices = async (btn) => {
    let fromPattern = btn?.target?.name;
    const fromData = (btn) ? '?from=' + fromPattern : '';
    const response = await fetch('/api/usdtPrices' + fromData);
    const data = await response.json();
    setChartData(data);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Binance P2P USDT</title>
        <meta name="description" content="Binance p2p usdt/ars history" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeNavBar />
      <main className={styles.maincontainer}>
        <Grid.Container gap={1}>
          <Grid>
            <Button size={"sm"} onClick={fetchPrices} name="1w">1w</Button>
          </Grid>
          <Grid>
            <Button size={"sm"} onClick={fetchPrices} name="1m">1m</Button>
          </Grid>
          <Grid>
            <Button size={"sm"} color="secondary" onClick={fetchPrices}>all</Button>
          </Grid>
        </Grid.Container>
        <div className={styles.chartcontainer}>
          <PriceChart usdtPrices={chartData} />
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  const result = await fetch(`http://${req.headers.host}/api/usdtPrices?from=1m`).then(res => res.json())
  .catch(e => { return {err: 1} });
  return {
    props: {
      usdtPrices: result
    }
  }
}