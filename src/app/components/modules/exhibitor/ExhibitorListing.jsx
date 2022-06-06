import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { exhibitorListingSelector, fetchExhibitors } from "store/Slices/ExhibitorListingSlice";
import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import PageLoader from "@/ui-components/PageLoader";

import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/exhibitor/listing/ExhibitorListing`)
  );
  return Component;
};

const ExhibitorListing = (props) => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;

  const Component = useMemo(
    () => loadModule(event.theme.slug),
    [event]
  );

    useEffect(() => {
      dispatch(incrementLoadCount());
      dispatch(fetchExhibitors(eventUrl));
    }, []);
  const { exhibitors, labels, exhibitorCategories, loading, error} = useSelector(exhibitorListingSelector);
  return (
    <Suspense fallback={<PageLoader/>}>
      {exhibitors && exhibitors.length > 0 ? (
        <React.Fragment>
          <Component exhibitors={exhibitors} labels = {labels} exhibitorCategories={exhibitorCategories}  />
        </React.Fragment>
      ) : <PageLoader/> 
      }
    </Suspense>
  );
};

export default withRouter(ExhibitorListing);
