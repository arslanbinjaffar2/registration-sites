import React, { Suspense, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector } from "react-redux";
import PageLoader from "components/ui-components/PageLoader";

const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/event_info/${variation}`)
  );
  return Component;
};

const EventInformation = () => {
  const { event } = useSelector(eventSelector);
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["event_info"]);
  });

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  return (
    <Suspense fallback={''}>
      <Component event={event} settings={moduleVariation[0]} socialMediaShare={event.socialMediaShare} labels={event.labels} />
    </Suspense>
  );
};

export default EventInformation;

