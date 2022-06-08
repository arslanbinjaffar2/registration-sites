import React, { Suspense, useEffect, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "@/ui-components/PageLoader";
import { speakerDetailSelector, fetchSpeakerDetail, clearState } from "store/Slices/SpeakerDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
// const in_array = require("in_array");
const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/speaker/detail/${variation}`)
  );
  return Component;
};

const SpeakerDetail = (props) => {
  const id = props.match.params.id;
  const { event } = useSelector(eventSelector);
  const {speaker, labels } = useSelector(speakerDetailSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  const Component = useMemo(
    () => loadModule(event.theme.slug, "Variation1"),
    [event]
  );
 
  useEffect(() => {
    dispatch(fetchSpeakerDetail(eventUrl, id));
    return () => {
      dispatch(clearState());
    }
  }, []);

  return (
    <Suspense fallback={<PageLoader/>}>
      {speaker ? (
        <React.Fragment>
          <Component  speaker={speaker} labels={labels} />
        </React.Fragment>
      ) : <PageLoader/>} 
    </Suspense>
  );
};

export default withRouter(SpeakerDetail);
