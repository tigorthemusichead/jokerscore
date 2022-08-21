import '../styles/globals.css'
import Head from "next/head";
import Link from "next/link";
import HeaderCard from "../components/header-card";
import {useEffect, useState} from "react";
import router, {useRouter} from "next/router"
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import 'react-notifications/lib/notifications.css';


function MyApp({ Component, pageProps }) {

  const [cardSide, setCardSide] = useState(false);
  const [data, setData] = useState({});

    router.events.on('routeChangeStart', () => {
        setCardSide(cardSide => !cardSide);
    })
    router.events.on('routeChangeComplete', () => {
        setCardSide(cardSide => !cardSide)
    })

    useEffect(()=>{
        const storageData = JSON.parse(localStorage.getItem('JOKER_SCORE_DATA')) || {scores: []};
        setData(storageData);
    }, []);

  return (
    <>
      <Head>
        <title>Joker | Score</title>
          <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
      </Head>
      <header>
          <Link href={'/'}>
              <h1><span>J</span>OKER | SCORE</h1>
          </Link>
          <HeaderCard
              side={cardSide}
          />
      </header>
      <Component
          data={data}
          {...pageProps}
      />
        <footer>
            Also try <a href={''}>KGL Coin</a>
        </footer>
        <NotificationContainer/>
    </>
  )
}

export default MyApp
