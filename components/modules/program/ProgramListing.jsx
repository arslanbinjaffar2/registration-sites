import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "components/ui-components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import { programListingSelector, fetchPrograms } from "store/Slices/ProgramListingSlice";
import Head from "next/head";

const in_array = require("in_array");

const loadModule = (theme, programView) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/program/listing/${programView}`)
  );
  return Component;
};

const ProgramListing = (props) => {

  const initialMount = useRef(true);

  const { event } = useSelector(eventSelector);

  const dispatch = useDispatch();

  const eventUrl = event.url;

  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["time_table"]);
  });

  const home = props.homePage ? props.homePage : false;

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  const { programs, tracks, totalPages, labels } = useSelector(programListingSelector);

  useEffect(() => {
    if (programs === null) {
      dispatch(fetchPrograms(eventUrl));
    }
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      {programs ? (
        <React.Fragment>
          <Head>
            <title>{event.eventsiteModules.program}</title>
          </Head>
          <Component programs={programs} eventUrl={eventUrl} tracks={tracks} showWorkshop={event.eventsiteSettings.agenda_collapse_workshop} siteLabels={event.labels} agendaSettings={event.agenda_settings} eventLanguageId={event.language_id} filters={true} />
        </React.Fragment>
      ) : <PageLoader />}
    </Suspense>
  );
  
};

export default ProgramListing;
