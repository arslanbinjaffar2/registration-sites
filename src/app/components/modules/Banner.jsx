import React, { Suspense, useEffect, useMemo } from "react";
import { eventSelector } from "../../../store/Slices/EventSlice";
import { globalSelector, fetchBanner } from "../../../store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/attendee/${variation}`)
  );
  return Component;
};

const Banner = () => {
  const { event } = useSelector(eventSelector);
  const {
    global
  } = useSelector(globalSelector);
  const dispatch = useDispatch();

  const eventUrl = event.url;
  let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["banner"]);
  });
  const CustomComponent = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["slug"]),
    [event]
  );

  useEffect(() => {
    dispatch(fetchBanner(eventUrl));
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {global ? <CustomComponent banner={global.banner} /> : <div>Loading...</div>}
    </Suspense>
  );
};

export default withRouter(Banner);
