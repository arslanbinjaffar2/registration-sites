import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { sponsorDetailSelector, fetchSponsor } from "store/Slices/SponsorDetailSlice";
import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import PageLoader from "@/ui-components/PageLoader";

import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/sponsor/detail/SponsorDetail`)
  );
  return Component;
};

const SponsorDetail = (props) => {
const id = props.match.params.id;
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;

  const Component = useMemo(
    () => loadModule(event.theme.slug),
    [event]
  );

    useEffect(() => {
      dispatch(incrementLoadCount());
      dispatch(fetchSponsor(eventUrl, id));
    }, []);
  const { sponsor, labels, documents,  loading, error} = useSelector(sponsorDetailSelector);
  return (
    <Suspense fallback={<PageLoader/>}>
      {sponsor ? (
        <React.Fragment>
          <Component sponsor={sponsor} labels = {labels}  documents={documents} />
        </React.Fragment>
      ) : <PageLoader/> 
      }
    </Suspense>
  );
};

export default withRouter(SponsorDetail);
