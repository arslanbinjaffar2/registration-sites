import React, { Suspense, useEffect, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import PageLoader from "@/ui-components/PageLoader";
import { fetchDocuments, documentsSelector } from "store/Slices/DocumentsSlice";
const loadModule = (theme, ) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/documents/Documents`)
  );
  return Component;
};

const Documents = () => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  
  const CustomComponent = useMemo(
    () => loadModule(event.theme.slug),
    [event]
  );


  useEffect(() => {
    dispatch(fetchDocuments(eventUrl));
  }, []);
  
  const { documents } = useSelector(documentsSelector);
  

  return (
    <Suspense fallback={''}>
       {documents ? <CustomComponent documents={documents} /> : <PageLoader/>}
    </Suspense>
  );
};

export default withRouter(Documents);
