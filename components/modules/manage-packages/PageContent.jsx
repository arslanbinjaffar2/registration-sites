import React, { Suspense, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector } from "react-redux";
const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/manage-packages/Variation1`)
  );
  return Component;
};

const PageContent = ({isHome}) => {
  const { event } = useSelector(eventSelector);
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["registration_packages"]);
  });

  const Component = useMemo(
    () => loadModule(event.theme.slug),
    [event]
  );
  console.log(event.eventsiteSettings.registration_packages, "event");
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Component isHome={isHome} />
    </Suspense>
  );
};

export default PageContent;
