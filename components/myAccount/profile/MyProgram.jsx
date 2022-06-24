import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "components/ui-components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import { myProgramListingSelector, fetchMyPrograms ,clearState } from "store/Slices/myAccount/MyProgramListingSlice";

const in_array = require("in_array");

const loadModule = (theme) => {
  const view = 'ProgramListing.jsx';
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/program/listing/${view}`)
  );
  return Component;
};

const MyProgram = () => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  const Component = useMemo(
    () => loadModule(event.theme.slug),
    [event]
  );
  const  {myPrograms, tracks, totalPages, labels } = useSelector(myProgramListingSelector);
  useEffect(() => {
      dispatch(fetchMyPrograms(eventUrl, event.id));
    return ()=>{
      clearState();
    }
  }, []);


  return (
    <Suspense fallback={<PageLoader/>}>
      {myPrograms ? (
        <React.Fragment>
          <Component programs={myPrograms} eventUrl={eventUrl} tracks={tracks} filters={false} showWorkshop={event.eventsiteSettings.agenda_collapse_workshop} siteLabels={event.labels} agendaSettings={event.agenda_settings} eventLanguageId={event.language_id} />
        </React.Fragment>
      ) : <PageLoader/> }
    </Suspense>
  );
};

export default MyProgram;
