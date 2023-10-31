import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "components/ui-components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import { useRouter } from 'next/router';
const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/cms/CmsListing`)
  );
  return Component;
};

const CmsListing = (props) => {

  const { event } = useSelector(eventSelector);

  const dispatch = useDispatch();

  const eventUrl = event.url;

  const router = useRouter();

  const Component = useMemo(
    () => loadModule(event.theme.slug),
    [event]
  );

  const informationModules = {
    additional_information: "additional_info_menu",
    general_information: "general_info_menu",
    practicalinformation: "practical_info_menu",
  };

  const informationModulesAliases = {
    additional_information: "additional_information",
    general_information: "general_information",
    practicalinformation: "practicalinformation",
  };

  const checkModuleStatus = useMemo(()=>(event?.header_data?.top_menu.findIndex((item)=>(item.alias === informationModulesAliases[props.moduleName]))),[event]);
  
  useEffect(() => {
    if(checkModuleStatus < 0){
      router.push(`/${eventUrl}`);
    }
  }, []);


  return (
    <Suspense fallback={<PageLoader />}>
      <React.Fragment>
        <Head>
          <title>{event.eventsiteModules[props.moduleName]}</title>
        </Head>
        <Component listing={event.header_data[informationModules[props.moduleName]]} menu_id={props.menu_id} moduleName={props.moduleName} eventUrl={event.url} eventSiteModuleName={event.header_data.top_menu.find((data)=>(data.alias === props.moduleName)) !== (undefined || null) ? event.header_data.top_menu.find((data)=>(data.alias === props.moduleName)).module : props.moduleName} breadCrumbData={event.header_data[informationModules[props.moduleName]]} eventsiteSettings={event.eventsiteSettings} />
      </React.Fragment>
    </Suspense>
  );
};

export default CmsListing;
