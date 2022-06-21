import React, { useEffect } from "react";
import type from 'next/app'
import Head from 'next/head'
import 'public/sass/app.scss';
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent, eventSelector } from "store/Slices/EventSlice";
import { ltrim } from "helpers";
import FullPageLoader from "components/ui-components/FullPageLoader";
import Theme from "components/Theme";
import { store } from "store/store";
import { Provider } from "react-redux";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  const { event } = router.query;

  useEffect(() => {
    store.dispatch(fetchEvent(event));
  }, [store, event]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp
