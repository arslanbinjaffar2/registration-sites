import React, { Suspense, useEffect, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "@/ui-components/PageLoader";
import moment from "moment";
import {
  globalSelector,
  fetchBanner,
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/banner/${variation}`)
  );
  return Component;
};

const Banner = () => {
  const { event } = useSelector(eventSelector);
  const { banner } = useSelector(globalSelector);
  const dispatch = useDispatch();

  const eventUrl = event.url;
  
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["top_banner"]);
  });

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  useEffect(() => {
    if (banner === null) {
      dispatch(incrementLoadCount());
      dispatch(fetchBanner(eventUrl));
    }
  }, [dispatch]);
  return (
    <Suspense fallback={<div></div>}>
      {banner ? <Component banner={banner} event={event} countdown={event.eventsiteSettings.registration_end_date !== "0000-00-00 00:00:00" ? event.eventsiteSettings.registration_end_date: null} /> : null}
    </Suspense>
  );
};

export default withRouter(Banner);
