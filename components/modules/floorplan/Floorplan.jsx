import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "components/ui-components/PageLoader";
import Head from "next/head";
import { useRouter } from 'next/router';
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/floorplan/Variation1`)
  );
  return Component;
};

const Floorplan = (props) => {

  const initialMount = useRef(true);

  const { event } = useSelector(eventSelector);


  const eventUrl = event.url;
  const router = useRouter();


  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["floorplan"]);
  });


  const Component = useMemo(
    () => loadModule(event.theme.slug, "Variation1"),
    [event]
  );


  const checkModuleStatus = useMemo(()=>(event?.header_data?.top_menu.findIndex((item)=>(item.alias === 'floorplan'))),[event]);
  // get name of module where alias is home
  const floorplanModule = event?.header_data?.top_menu.find((item)=>(item.alias === 'floorplan'));
  
  const checkModuleHomeStatus = useMemo(()=>(event?.layoutSections?.findIndex((item)=>(item.module_alias === 'floorplan' && item.status == 1))),[event]);

  useEffect(() => {
    console.log('tpmenu',event?.header_data?.top_menu)
    if(checkModuleStatus < 0 && checkModuleHomeStatus < 0){
      router.push(`/${eventUrl}`);
    }
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      
        <React.Fragment>
        {!props.homePage && <Head><title>Floorplan</title></Head>}
        <Component moduleName={floorplanModule?.module} />
        </React.Fragment>
      
    </Suspense>
  );
};

export default Floorplan;
