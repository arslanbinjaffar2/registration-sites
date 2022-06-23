import React, { useEffect, useState } from "react";
import 'public/sass/app.scss';
import { fetchEvent, eventSelector } from "store/Slices/EventSlice";
import { store } from "store/store";
import { Provider } from "react-redux";
import { useRouter } from 'next/router';
import FullPageLoader from "components/ui-components/FullPageLoader";
import Theme from "components/Theme";

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  const { event } = router.query;

  const [_eventObj, setEventObj] = useState({});
  useEffect(() => {
    store.dispatch(fetchEvent(event));
  }, [store, event]);

  useEffect(() => {
    store.subscribe(() => {
      if (Object.keys(_eventObj)?.length === 0) {
        setEventObj(store.getState().event);
      }
    });
  }, [_eventObj]);

  return (
    <div id="App">
      <Provider store={store}>
        {_eventObj.error && _eventObj.loading ? (
          <div id="App">
            <h3>Could not Fetch the Event...</h3>
          </div>
        ) : (
          <>
            {_eventObj.loading && <FullPageLoader className="fixed" />}
            {_eventObj.event && (
              <>
                <Theme data={_eventObj.event} />
                <Component {...pageProps} />
              </>
            )}
          </>
        )}
      </Provider>
    </div>
  );
}

export default MyApp
