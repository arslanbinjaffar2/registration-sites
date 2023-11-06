import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { cmsDetailSelector, fetchCmsPage, clearState } from "store/Slices/CmsDetailSlice";
import PageLoader from "components/ui-components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import Head from 'next/head'

const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/infoPages/InfoPageDetail`)
  );
  return Component;
};

const CmsDetail = (props) => {

  const router = useRouter();

  const { id } = router.query;

  const { event } = useSelector(eventSelector);

  const dispatch = useDispatch();

  const eventUrl = event.url;

  const Component = useMemo(
    () => loadModule(event.theme.slug),
    [event]
  );

  useEffect(() => {
    
    dispatch(fetchCmsPage(eventUrl, 'info_pages', id));
    return () => {
      dispatch(clearState());
    }
  }, [props.moduleName, id]);

  const { cmsPage, labels, loading, error } = useSelector(cmsDetailSelector);
  
  const [checkModuleStatus, setCheckModuleStatus] = useState(-1)

  useEffect(() => {
   
    if(cmsPage !== null){
      const checkModuleStatus1 = event?.header_data?.top_menu.findIndex((item)=>(item.alias === 'info_pages' && item.page_id == cmsPage.section_id));
     
     if(checkModuleStatus1 < 0){
       router.push(`/${eventUrl}`);
     }
     else{
      setCheckModuleStatus(checkModuleStatus1)
     }

   }
  }, [cmsPage])
  

  return (
    <Suspense fallback={<PageLoader />}>
      {cmsPage && checkModuleStatus > -1 ? (
        <React.Fragment>
          <Component detail={cmsPage} labels={labels} moduleName={'info_pages'} eventUrl={event.url} eventsiteSettings={event.eventsiteSettings} eventSiteModuleName={event.header_data['info_pages_menu'].find((data)=>(data.id  == cmsPage.section_id)) !== (null||undefined) ? event.header_data['info_pages_menu'].find((data)=>(data.id  == cmsPage.section_id)).info.name : cmsPage.name} breadCrumbData={event.header_data['info_pages_menu'].find((data)=>(data.id  == cmsPage.section_id)) !== (null||undefined) ? event.header_data['info_pages_menu'].find((data)=>(data.id  == cmsPage.section_id)) : []} />
        </React.Fragment>
      ) : <PageLoader />
      }
    </Suspense>
  );
};

export default CmsDetail;
