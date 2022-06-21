import React, { Suspense, useEffect, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { attendeeDetailSelector, fetchAttendeeDetail, clearState } from "store/Slices/AttendeeDetailSlice";
import PageLoader from "@/ui-components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
// const in_array = require("in_array");
const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/attendee/detail/${variation}`)
  );
  return Component;
};


const AttendeeDetail = (props) => {
  const id = props.match.params.id;
  const { event } = useSelector(eventSelector);
  const { attendee, labels } = useSelector(attendeeDetailSelector);
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
    dispatch(fetchAttendeeDetail(eventUrl, id));
    return () => {
      dispatch(clearState());
    }
  }, []);
  return (
    <Suspense fallback={<PageLoader/>}>
      {attendee ? (
        <React.Fragment>
          <Component  attendee={attendee} labels={labels} />
        </React.Fragment>
      ) : <PageLoader/>}
    </Suspense>
  );
};

export default withRouter(AttendeeDetail);
