import React, { Suspense, useMemo } from "react";
import { eventSelector } from "../../../store/Slices/EventSlice";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/timetable/${variation}`)
  );
  return Component;
};

const Timetable = () => {
  const { event } = useSelector(eventSelector);
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["time_table"]);
  });

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

export default withRouter(Timetable);
