import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { newsSelector, fetchNews } from "store/Slices/NewsSlice";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "components/ui-components/PageLoader";
import LoadMoreButton from 'components/ui-components/LoadMoreButton';
import Head from "next/head";
import PageHeader from "../PageHeader";
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

  const dispatch = useDispatch();

  const eventUrl = event.url;
  const router = useRouter();


  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["floorplan"]);
  });

  const limit = props.homePage ? "default_setting" : 10;

  const Component = useMemo(
    () => loadModule(event.theme.slug, "Variation1"),
    [event]
  );

  const [page, setPage] = useState(1);

  const checkModuleStatus = useMemo(()=>(event?.header_data?.top_menu.findIndex((item)=>(item.alias === 'floorplan'))),[event]);
  
  const checkModuleHomeStatus = useMemo(()=>(event?.layoutSections?.findIndex((item)=>(item.module_alias === 'floorplan' && item.status == 1))),[event]);


  // useEffect(() => {
  //   if(checkModuleStatus < 0 && checkModuleHomeStatus < 0){
  //     router.push(`/${eventUrl}`);
  //   }
  //   dispatch(fetchNews(eventUrl, page, limit, initialMount.current));
  // }, [page, limit]);

  // useEffect(() => {
  //   if (initialMount.current) {
  //     initialMount.current = false;
  //     return;
  //   }
  // }, []);

  const makeNewDetailURL = (event_url, id) => {
    return "/" + event_url + "/floorplan/" + id;
  };

  return (
    <Suspense fallback={<PageLoader />}>
      
        <React.Fragment>
        {!props.homePage && <Head><title>Floorplan</title></Head>}
        <Component />
        </React.Fragment>
      
    </Suspense>
  );
};

export default Floorplan;
