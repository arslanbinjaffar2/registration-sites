import React, { useState, useEffect, useMemo, Suspense } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { newsDetailSelector, fetchNewsDetail, clearState } from "store/Slices/NewsDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "components/ui-components/PageLoader";
import Head from 'next/head'

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/floorplan/detail/Variation1`)
  );
  return Component;
};

const FloorplanDetail = (props) => {

  const { event } = useSelector(eventSelector);

  const Component = useMemo(
    () => loadModule(event.theme.slug, "Variation1"),
    [event]
  ); 
  return (
    <Suspense fallback={<PageLoader/>}>
      {!props.homePage && <Head><title>Floorplan Detail</title></Head>}
        <React.Fragment>
          <Component  />
        </React.Fragment>
    </Suspense>
  );
};

export default FloorplanDetail;
