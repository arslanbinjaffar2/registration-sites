import React, { Suspense, useEffect, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import {
  globalSelector,
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}//${variation}`)
  );
  return Component;
};

const RegisterNow = () => {
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
    }
  }, [dispatch]);
  return (
    <Suspense fallback={<div></div>}>
      {banner ? <Component /> : null}
    </Suspense>
  );
};

export default withRouter(RegisterNow);
