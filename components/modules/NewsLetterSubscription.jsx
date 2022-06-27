import React, { Suspense, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector } from "react-redux";

const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/newsletter_subscription/${variation}`)
  );
  return Component;
};

const NewsLetterSubscription = () => {
  const { event } = useSelector(eventSelector);
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["newsletter_subscription"]);
  });

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  return (
    <Suspense fallback={''}>
      <Component event={event} moduleVariation={moduleVariation[0]} labels={event.labels} />
    </Suspense>
  );
};

export default NewsLetterSubscription;

