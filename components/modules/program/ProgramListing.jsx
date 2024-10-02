import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "components/ui-components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import { programListingSelector, fetchPrograms } from "store/Slices/ProgramListingSlice";
import Head from "next/head";
import PageHeader from "../PageHeader";
import { useRouter } from 'next/router';

const in_array = require("in_array");

const loadModule = (theme, programView) => {
  console.log(programView,'program')
  const Component = React.lazy(() =>
  import(`components/themes/${theme}/program/listing/${programView}`)
  );
  return Component;
};

const ProgramListing = (props) => {

  const initialMount = useRef(true);

  const { event } = useSelector(eventSelector);

  const dispatch = useDispatch();

  const router = useRouter();

  const eventUrl = event.url;

  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["agenda"]);
  });

  const home = props.homePage ? props.homePage : false;

  const checkModuleTopStatus = useMemo(()=>(event?.header_data?.top_menu.findIndex((item)=>(item.alias === 'program'))),[event]);
  const checkModuleHomeStatus = useMemo(()=>(event?.layoutSections?.findIndex((item)=>(item.module_alias === 'agenda' && item.status == 1))),[event]);

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  const { programs, tracks, totalPages, labels } = useSelector(programListingSelector);

  useEffect(() => {

    if(checkModuleTopStatus < 0 && checkModuleHomeStatus < 0){
      router.push(`/${eventUrl}`);
    }
    if (programs === null) {
      dispatch(fetchPrograms(eventUrl));
    }
  }, []);
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  return (
    <Suspense fallback={<PageLoader />}>
      {programs ? (
        <React.Fragment>
          <Head>
            <title>{event.eventsiteModules.program}</title>
          </Head>
          <PageHeader desc={event.labels.EVENTSITE_PROGRAM_DETAIL} label={event.labels.EVENTSITE_PROGRAM}/>
          {Object.keys(programs).length > 0 ? 
          <Component programs={programs} eventUrl={eventUrl} tracks={tracks} showWorkshop={event.agenda_settings.agenda_collapse_workshop} siteLabels={event.labels} agendaSettings={event.agenda_settings} eventLanguageId={event.language_id} filters={true} eventsiteSettings={event.eventsiteSettings} 
          moduleVariation={moduleVariation[0]}
          /> :
          <div style={{textAlign:"center"}}>
            <h4>{event.siteLabels.EVENT_NORECORD_FOUND}</h4>
          </div>
          }
        </React.Fragment>
      ) : <PageLoader />}
    </Suspense>
  );
  
};

export default ProgramListing;
