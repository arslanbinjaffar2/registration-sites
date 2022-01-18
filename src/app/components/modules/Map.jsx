import React, { Suspense, useMemo, useEffect } from "react";
import { eventSelector } from "../../../store/Slices/EventSlice";
import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import {
  mapSelector,
  fetchMap,
} from "store/Slices/MapSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/map/${variation}`)
  );
  return Component;
};

const Map = () => {
  const { event } = useSelector(eventSelector);
  const { map } = useSelector(mapSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["maps"]);
  });

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["slug"]),
    [event]
  );

  useEffect(() => {
    if (map === null) {
      dispatch(incrementLoadCount());
      dispatch(fetchMap(eventUrl));
    }
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {map ? <Component map={map} event={event} /> : null}
    </Suspense>
  );
};

export default withRouter(Map);
