import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent, eventSelector } from "../store/Slices/EventSlice";
import "sass/app.scss";
import { ltrim } from "helpers";
import RouterOutlet from "router/RouterOutlet";
import FullPageLoader from "./components/ui-components/FullPageLoader";
import Theme from "./components/Theme";
import { Helmet } from "react-helmet";
const App = () => {
  let path = ltrim(window.location.pathname, "/");
  let params = path.split("/");
  const dispatch = useDispatch();
  const { event, loading, error } = useSelector(eventSelector);
  useEffect(() => {
    dispatch(fetchEvent(params.length > 0 ? params[0] : ""));
  }, [dispatch]);

  if (error && loading) {
    return (
      <div id="App">
        <h3>Could not Fetch the Event...</h3>
      </div>
    );
  }
  return (
    <div id="App" style={{ postion: "relative" }}>
      {loading && <FullPageLoader className="fixed" />}
      {!loading && event && (
        <React.Fragment>
          <Helmet>
            <title>{event.name}</title>
            <meta property="og:title" content={event.name} />
            <meta property="og:type" content="Event" />
            <meta
              property="og:url"
              content={`${window.location.origin.toString()}/${event.url}`}
            />
            <meta
              property="og:image"
              content={
                event.settings.social_media_logo &&
                event.settings.social_media_logo !== ""
                  ? process.env.REACT_APP_EVENTCENTER_URL +
                    "/assets/event/social_media/" +
                    event.settings.social_media_logo
                  : event.settings.header_logo &&
                    event.settings.header_logo !== ""
                  ? process.env.REACT_APP_EVENTCENTER_URL +
                    "/assets/event/branding/" +
                    event.settings.header_logo
                  : process.env.REACT_APP_EVENTCENTER_URL +
                    "/_eventsite_assets/images/eventbuizz_logo-1.png"
              }
            />
            <meta
              property="twitter:image"
              content={
                event.settings.social_media_logo &&
                event.settings.social_media_logo !== ""
                  ? process.env.REACT_APP_EVENTCENTER_URL +
                    "/assets/event/social_media/" +
                    event.settings.social_media_logo
                  : event.settings.header_logo &&
                    event.settings.header_logo !== ""
                  ? process.env.REACT_APP_EVENTCENTER_URL +
                    "/assets/event/branding/" +
                    event.settings.header_logo
                  : process.env.REACT_APP_EVENTCENTER_URL +
                    "/_eventsite_assets/images/eventbuizz_logo-1.png"
              }
            />
            <meta property="twitter:card" content="summary_large_image" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="msapplication-config" content="none" />
            <meta
              property="og:description"
              content={
                event.description && event.description.info
                  ? event.description.info.description
                  : event.name
              }
            />
            <link
              rel="icon"
              type="image/x-icon"
              href={
                event.settings.app_icon && event.settings.app_icon !== ""
                  ? process.env.REACT_APP_EVENTCENTER_URL +
                    "/assets/event/branding/" +
                    event.settings.app_icon
                  : require("img/square.jpg")
              }
            />
            {event.settings.google_analytics && (
              <script
                async
                src="https://www.google-analytics.com/analytics.js"
              />
            )}
            {event.settings.google_analytics && (
              <script>
                {`
                  window.ga=window.ga||function()
                  {(ga.q = ga.q || []).push(arguments)}
                  ;ga.l=+new Date; ga('create',
                  '${event.settings.google_analytics}', 'auto'); ga('send',
                  'pageview');
                  `}
              </script>
            )}
          </Helmet>
          <RouterOutlet />
        </React.Fragment>
      )}
      {event && <Theme data={event} />}
    </div>
  );
};

export default App;
