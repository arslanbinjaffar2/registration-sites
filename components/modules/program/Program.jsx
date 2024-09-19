import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";

import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
import { programSelector, fetchPrograms } from "store/Slices/ProgramSlice";
import { useRouter } from 'next/router';


const in_array = require("in_array");

const loadModule = (theme,programView) => {
  const Component = React.lazy(() =>
     import(`components/themes/${theme}/program/listing/${programView}`)
  );
  return Component;
};

const Program = (props) => {

  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  const router = useRouter();

  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["agenda"]);
  });
  const Component = useMemo(
    () => loadModule(event.theme.slug,moduleVariation[0]["variation_slug"]),
    [event]
  );
  const { programs, tracks, labels } = useSelector(programSelector);

  const checkModuleTopStatus = useMemo(()=>(event?.header_data?.top_menu.findIndex((item)=>(item.alias === 'program'))),[event]);
  const checkModuleHomeStatus = useMemo(()=>(event?.layoutSections?.findIndex((item)=>(item.module_alias === 'agenda' && item.status == 1))),[event]);


  useEffect(() => {
    if(checkModuleTopStatus < 0 && checkModuleHomeStatus < 0){
      router.push(`/${eventUrl}`);
    }
    if (programs === null) {
      dispatch(fetchPrograms(eventUrl));
      dispatch(incrementLoadCount());
    }
  }, [])
  return (
    <Suspense fallback={''}>
      {programs ? (
        <React.Fragment>  
          <Component programs={programs}  agendaSettings={event.agenda_settings} tracks={tracks} siteLabels={event.labels} moduleVariation={moduleVariation[0]} eventUrl={eventUrl} language_id={event.language_id} showWorkshop={event.agenda_settings.agenda_collapse_workshop} />
        </React.Fragment>
      ) : null
      }
    </Suspense>
  );
};

export default Program;
