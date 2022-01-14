import React, { Suspense, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import {
  globalSelector
} from "../../../store/Slices/GlobalSlice";

const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/header/${variation}`)
  );
  return Component;
};

const Header = ({location}) => {
  const { event } = useSelector(eventSelector);
  const { loadedSections } = useSelector(globalSelector);
  let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["header"]);
  });

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["slug"]),
    [event]
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component event={event} loaded={loadedSections}  location={location} />
    </Suspense>
  );
};

export default withRouter(Header);
