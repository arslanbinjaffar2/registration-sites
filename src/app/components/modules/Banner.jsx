import React, { Suspense, useEffect, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
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
  let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["banner"]);
  });
  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["slug"]),
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
      {banner ? <Component banner={banner} event={event} /> : null}
    </Suspense>
  );
};

export default withRouter(Banner);
