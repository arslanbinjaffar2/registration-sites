import React, { useEffect, useState } from "react";
import 'public/sass/app.scss';
import 'photoswipe/dist/photoswipe.css';
import { fetchEvent, eventSelector } from "store/Slices/EventSlice";
import { store } from "store/store";
import { Provider } from "react-redux";
import { useRouter } from 'next/router';
import FullPageLoader from "components/ui-components/FullPageLoader";
import Theme from "components/Theme";
import ErrorBoundary from 'components/ErrorBoundary';
require("moment/min/locales.min");
function MyApp({ Component, pageProps }) {

  const router = useRouter();

  const { event } = router.query;

  const [_eventObj, setEventObj] = useState({});

  useEffect(() => {
    if (event) {
      store.dispatch(fetchEvent(event));
    }
  }, [store, event]);

  useEffect(() => {
    store.subscribe(() => {
      if (Object.keys(_eventObj)?.length === 0) {
        setEventObj(store.getState().event);
      }
    });
  }, [_eventObj]);

  return (
    <React.Fragment>
      {_eventObj.loading && <FullPageLoader className="fixed" />}
      <div style={{ transform: 'none' }} id="App">
        <Provider store={store}>

          {_eventObj.event && (
            <>
              <Theme data={_eventObj.event} />
            </>
          )}
           <ErrorBoundary>
              <Component {...pageProps} />
           </ErrorBoundary>
        </Provider>
      </div>
    </React.Fragment>
  );
}

export default MyApp
