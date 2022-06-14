import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "@/ui-components/PageLoader";

import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
import { programSelector, fetchPrograms } from "store/Slices/ProgramListingSlice";

import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/program/listing/ProgramListing.jsx`)
  );
  return Component;
};

const ProgramListing = (props) => {
  const initialMount = useRef(true);
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["agenda"]);
  });
  const home = props.homePage ? props.homePage : false;
  const Component = useMemo(
    () => loadModule(event.theme.slug),
    [event]
  );
  const { programs, tracks, totalPages, labels } = useSelector(programSelector);

  useEffect(() => {
    if(programs === null){
      dispatch(fetchPrograms(eventUrl));
    }
  }, []);


  return (
    <Suspense fallback={<PageLoader/>}>
      {programs ? (
        <React.Fragment>
          <Component programs={programs} eventUrl={eventUrl} tracks={tracks}/>
        </React.Fragment>
      ) : <PageLoader/> }
    </Suspense>
  );
};

export default withRouter(ProgramListing);
