import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { speakerDetailSelector, fetchSpeakerDetail } from "store/Slices/SpeakerDetailSlice";
import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
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
  const {speaker} = useSelector(speakerDetailSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  // let moduleVariation = event.theme.modules.filter(function (module, i) {
  //   return in_array(module.alias, ["attendee"]);
  // });
  const Component = useMemo(
    () => loadModule(event.theme.slug, "Variation1"),
    [event]
  );
 
  useEffect(() => {
    dispatch(fetchSpeakerDetail(eventUrl, id));
    dispatch(incrementLoadCount());
  }, []);

  return (
    <Suspense fallback={<div></div>}>
      {speaker ? (
        <React.Fragment>
          <Component  speaker={speaker} />
        </React.Fragment>
      ) : null} 
    </Suspense>
  );
};

export default withRouter(SpeakerDetail);
