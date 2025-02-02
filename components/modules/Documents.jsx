import React, { Suspense, useEffect, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "components/ui-components/PageLoader";
import { fetchDocuments, documentsSelector } from "store/Slices/DocumentsSlice";
import Head from "next/head";
import { useRouter } from 'next/router';
const loadModule = (theme, ) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/documents/Documents`)
  );
  return Component;
};

const Documents = () => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  const router = useRouter();
  
  const CustomComponent = useMemo(
    () => loadModule(event.theme.slug),
    [event]
  );

  const checkModuleStatus = useMemo(()=>(event?.header_data?.top_menu.findIndex((item)=>(item.alias === 'documents'))),[event]);
 
  useEffect(() => {
    if(checkModuleStatus < 0){
      router.push(`/${eventUrl}`);
    }
    dispatch(fetchDocuments(eventUrl, event.id));
  }, []);
  
  const { documents, module_headings } = useSelector(documentsSelector);
  

  return (
    <Suspense fallback={''}>
        <Head>
        <title>{event.eventsiteModules.documents}</title>
        </Head>
       {documents ? <CustomComponent documents={documents} moduleHeadings={module_headings} documentPage={true} labels={event.labels} eventTimezone={event.timezone.timezone} /> : <PageLoader/>}
    </Suspense>
  );
};

export default Documents;
