import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "components/ui-components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import { useRouter } from 'next/router';

const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/infoPages/InfoPagesListing`)
  );
  return Component;
};

const InfoPagesListing = (props) => {

  const { event } = useSelector(eventSelector);

  const dispatch = useDispatch();

  const eventUrl = event.url;

  const router = useRouter();

  const Component = useMemo(
    () => loadModule(event.theme.slug),
    [event]
  );

  const checkModuleStatus = useMemo(()=>(event?.header_data?.top_menu.findIndex((item)=>(item.alias === 'info_pages' && item.page_id == props.main_menu_id))),[event]);

  useEffect(() => {
    if(checkModuleStatus < 0){
      router.push(`/${eventUrl}`);
    }
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      {checkModuleStatus > -1 ? <React.Fragment>
        <Head>
          <title>{event.header_data['info_pages_menu'].find((item)=>(item.id == props.main_menu_id)) !== undefined ? event.header_data['info_pages_menu'].find((item)=>(item.id == props.main_menu_id)).info.name : "Information Pages"}</title>
        </Head>
        <Component 
        listing={event.header_data['info_pages_menu']}
        menu_id={props.menu_id} 
        main_menu_id={props.main_menu_id} 
        moduleName={props.moduleName} 
        eventUrl={event.url} 
        eventSiteModuleName={event.header_data.info_pages_menu.find((data)=>(data.id == props.main_menu_id)) != (undefined || null) ? 
          event.header_data.info_pages_menu.find((data)=>(data.id == props.main_menu_id)).info.name 
          : "Information Pages"}
        breadCrumbData={event.header_data.info_pages_menu}
        eventsiteSettings={event.eventsiteSettings}
        />
      </React.Fragment> : <PageLoader/>}
    </Suspense>
  );
};

export default InfoPagesListing;
