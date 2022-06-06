import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { sponsorListingSelector, fetchSponsors } from "store/Slices/SponsorListingSlice";
import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import PageLoader from "@/ui-components/PageLoader";

import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/sponsor/listing/SponsorListing`)
  );
  return Component;
};

const SponsorListing = (props) => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;

  const Component = useMemo(
    () => loadModule(event.theme.slug),
    [event]
  );

    useEffect(() => {
      dispatch(incrementLoadCount());
      dispatch(fetchSponsors(eventUrl));
    }, []);
  const { sponsors, labels, sponsorCategories, loading, error} = useSelector(sponsorListingSelector);
  return (
    <Suspense fallback={<PageLoader/>}>
      {sponsors && sponsors.length > 0 ? (
        <React.Fragment>
          <Component sponsors={sponsors} labels = {labels} sponsorCategories={sponsorCategories}  />
        </React.Fragment>
      ) : <PageLoader/> 
      }
    </Suspense>
  );
};

export default withRouter(SponsorListing);
