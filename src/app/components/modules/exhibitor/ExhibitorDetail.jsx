import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { exhibitorDetailSelector, fetchExhibitor, clearState } from "store/Slices/ExhibitorDetailSlice";
import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import PageLoader from "@/ui-components/PageLoader";

import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/exhibitor/detail/ExhibitorDetail`)
  );
  return Component;
};

const ExhibitorDetail = (props) => {
const id = props.match.params.id;
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;

  const Component = useMemo(
    () => loadModule(event.theme.slug),
    [event]
  );

    useEffect(() => {
      dispatch(incrementLoadCount());
      dispatch(fetchExhibitor(eventUrl, id));
      return () => {
        dispatch(clearState());
      }
    }, []);
  const { exhibitor, labels, documents, loading, error} = useSelector(exhibitorDetailSelector);
  return (
    <Suspense fallback={<PageLoader/>}>
      {exhibitor ? (
        <React.Fragment>
          <Component exhibitor={exhibitor} labels = {labels}  documents={documents} />
        </React.Fragment>
      ) : <PageLoader/> 
      }
    </Suspense>
  );
};

export default withRouter(ExhibitorDetail);
