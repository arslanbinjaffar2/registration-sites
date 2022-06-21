import React, { useEffect } from "react";
import type from 'next/app'
import Head from 'next/head'
import 'public/sass/app.scss';
import { fetchEvent, eventSelector } from "store/Slices/EventSlice";
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
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp
