import React, { useEffect, useState } from "react";
import 'public/sass/app.scss';
import { fetchEvent, eventSelector } from "store/Slices/EventSlice";
import { store } from "store/store";
import { Provider } from "react-redux";
import { useRouter } from 'next/router';
import FullPageLoader from "components/ui-components/FullPageLoader";
import Theme from "components/Theme";
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  const { event } = router.query;

  const [_eventObj, setEventObj] = useState({});
  useEffect(() => {
    if(event){
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
      <Head>
                {!_eventObj.loading && _eventObj.event !== undefined && (
                    <>
                        <title>{_eventObj.event.name}</title>
                        <meta property="og:title" content={_eventObj.event.name} />
                        <meta property="og:type" content="Event" />
                        {_eventObj.event.eventsiteSettings.search_engine_visibility == 0 &&
                            <meta name="robots" content="noindex"></meta>
                        }
                        <meta
                            property="og:url"
                            content={`${window.location.origin.toString()}/${_eventObj.event.url}`}
                        />
                        <meta
                            property="og:image"
                            content={
                                _eventObj.event.settings.social_media_logo &&
                                    _eventObj.event.settings.social_media_logo !== ""
                                    ? process.env.NEXT_APP_EVENTCENTER_URL +
                                    "/assets/event/social_media/" +
                                    _eventObj.event.settings.social_media_logo
                                    : _eventObj.event.settings.header_logo &&
                                        _eventObj.event.settings.header_logo !== ""
                                        ? process.env.NEXT_APP_EVENTCENTER_URL +
                                        "/assets/event/branding/" +
                                        _eventObj.event.settings.header_logo
                                        : process.env.NEXT_APP_EVENTCENTER_URL +
                                        "/_eventsite_assets/images/eventbuizz_logo-1.png"
                            }
                        />
                        <meta
                            property="twitter:image"
                            content={
                                _eventObj.event.settings.social_media_logo &&
                                    _eventObj.event.settings.social_media_logo !== ""
                                    ? process.env.NEXT_APP_EVENTCENTER_URL +
                                    "/assets/event/social_media/" +
                                    _eventObj.event.settings.social_media_logo
                                    : _eventObj.event.settings.header_logo &&
                                        _eventObj.event.settings.header_logo !== ""
                                        ? process.env.NEXT_APP_EVENTCENTER_URL +
                                        "/assets/event/branding/" +
                                        _eventObj.event.settings.header_logo
                                        : process.env.NEXT_APP_EVENTCENTER_URL +
                                        "/_eventsite_assets/images/eventbuizz_logo-1.png"
                            }
                        />
                        <meta property="twitter:card" content="summary_large_image" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="msapplication-config" content="none" />
                        <meta
                            property="og:description"
                            content={
                                _eventObj.event.description && _eventObj.event.description.info
                                    ? _eventObj.event.description.info.description
                                    : _eventObj.event.name
                            }
                        />
                        <link
                            rel="icon"
                            type="image/x-icon"
                            href={
                                _eventObj.event.settings.app_icon && _eventObj.event.settings.app_icon !== ""
                                    ? process.env.NEXT_APP_EVENTCENTER_URL +
                                    "/assets/event/branding/" +
                                    _eventObj.event.settings.app_icon
                                    : require("public/img/square.jpg")
                            }
                        />
                        {_eventObj.event.settings.google_analytics && (
                            <script
                                async
                                src="https://www.google-analytics.com/analytics.js"
                            />
                        )}
                        {_eventObj.event.settings.google_analytics && (
                            <script>
                                {`
                                        window.ga=window.ga||function()
                                        {(ga.q = ga.q || []).push(arguments)}
                                        ;ga.l=+new Date; ga('create',
                                        '${_eventObj.event.settings.google_analytics}', 'auto'); ga('send',
                                        'pageview');
                                    `}
                            </script>
                        )}
                    </>
                )}
            </Head>

    {_eventObj.loading && <FullPageLoader className="fixed" />}
    <div style={{transform: 'none'}} id="App">
      <Provider store={store}>
        {_eventObj.error && _eventObj.loading ? (
          <div id="App">
            <h3>Could not Fetch the Event...</h3>
          </div>
        ) : (
          <>
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
    </React.Fragment>
  );
}

export default MyApp
