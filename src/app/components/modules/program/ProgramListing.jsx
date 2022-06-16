import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "@/ui-components/PageLoader";

import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
import { programListingSelector, fetchPrograms } from "store/Slices/ProgramListingSlice";

import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, programView) => {
  const view = programView === 'horizontal' ? 'ProgramTimeLine.jsx' : 'ProgramListing.jsx';
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/program/listing/${view}`)
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
    () => loadModule(event.theme.slug, event.agenda_settings.program_view),
    [event]
  );
  const { programs, tracks, totalPages, labels } = useSelector(programListingSelector);

  useEffect(() => {
    if(programs === null){
      dispatch(fetchPrograms(eventUrl));
    }
  }, []);


  return (
    <Suspense fallback={<PageLoader/>}>
      {programs ? (
        <React.Fragment>
          <Component programs={programs} eventUrl={eventUrl} tracks={tracks} showWorkshop={event.eventsiteSettings.agenda_collapse_workshop} siteLabels={event.labels} agendaSettings={event.agenda_settings} eventLanguageId={event.language_id} />
        </React.Fragment>
      ) : <PageLoader/> }
    </Suspense>
  );
};

export default withRouter(ProgramListing);
