import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { sponsorSelector, fetchSponsors } from "store/Slices/SponsorSlice";
import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import PageLoader from "@/ui-components/PageLoader";

import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/sponsor/${variation}`)
  );
  return Component;
};

const Sponsor = (props) => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;

  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["sponsor"]);
  });

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

    useEffect(() => {
      dispatch(incrementLoadCount());
      dispatch(fetchSponsors(eventUrl));
    }, []);
  const { sponsorsByCategories, labels,  loading, error} = useSelector(sponsorSelector);
  return (
    <Suspense fallback={''}>
      {sponsorsByCategories && sponsorsByCategories.length > 0 ? (
        <React.Fragment>
          <Component sponsorsByCategories={sponsorsByCategories} labels = {labels} siteLabels={event.labels} settings={moduleVariation[0]} eventUrl={eventUrl} />
        </React.Fragment>
      ) : null 
      }
    </Suspense>
  );
};

export default withRouter(Sponsor);
