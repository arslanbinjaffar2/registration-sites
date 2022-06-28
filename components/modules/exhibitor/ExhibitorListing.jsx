import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { exhibitorListingSelector, fetchExhibitors, clearState } from "store/Slices/ExhibitorListingSlice";
import {
  incrementFetchLoadCount
} from "store/Slices/GlobalSlice";
import PageLoader from "components/ui-components/PageLoader";

import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/exhibitor/listing/ExhibitorListing`)
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
  const { exhibitors, labels, exhibitorCategories, loading, error} = useSelector(exhibitorListingSelector);

    useEffect(() => {
      if(exhibitors === null){
        dispatch(fetchExhibitors(eventUrl));
      }else{
        dispatch(incrementFetchLoadCount());
      }

      return () => {
        dispatch(clearState());
      }

    }, []);

  return (
    <Suspense fallback={<PageLoader/>}>
      {exhibitors && exhibitors.length > 0 ? (
        <React.Fragment>
          <Head>
            <title>{event.eventsiteModules.exhibitors}</title>
          </Head>
          <Component exhibitors={exhibitors} labels = {labels} exhibitorCategories={exhibitorCategories} eventUrl={eventUrl} siteLabels={event.labels} />
        </React.Fragment>
      ) : <PageLoader/> 
      }
    </Suspense>
  );
};

export default ExhibitorListing;
