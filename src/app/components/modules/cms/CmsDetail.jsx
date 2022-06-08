import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { cmsDetailSelector, fetchCmsPage, clearState } from "store/Slices/CmsDetailSlice";
import PageLoader from "@/ui-components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/cms/CmsDetail`)
  );
  return Component;
};

const CmsDetail = (props) => {
const id = props.match.params.id;
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;

  const Component = useMemo(
    () => loadModule(event.theme.slug),
    [event]
  );

useEffect(() => {
    dispatch(fetchCmsPage(eventUrl, props.moduleName , id));
    return () => {
    dispatch(clearState());
    }
}, [props.moduleName, id]);

  const { cmsPage, labels, loading, error} = useSelector(cmsDetailSelector);
  return (
    <Suspense fallback={<PageLoader/>}>
      {cmsPage ? (
        <React.Fragment>
          <Component detail={cmsPage} labels = {labels} moduleName={props.moduleName}  />
        </React.Fragment>
      ) : <PageLoader/> 
      }
    </Suspense>
  );
};

export default withRouter(CmsDetail);
