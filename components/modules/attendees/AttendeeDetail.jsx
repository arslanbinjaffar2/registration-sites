import React, { Suspense, useEffect, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { attendeeDetailSelector, fetchAttendeeDetail, clearState } from "store/Slices/AttendeeDetailSlice";
import PageLoader from "components/ui-components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import Head from "next/head";
const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/attendee/detail/${variation}`)
  );
  return Component;
};


const AttendeeDetail = (props) => {

  const router = useRouter();

  const { id } = router.query;

  const { event } = useSelector(eventSelector);

  const { attendee, labels } = useSelector(attendeeDetailSelector);

  const dispatch = useDispatch();

  const eventUrl = event.url;

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
    <Suspense fallback={<PageLoader />}>
      {attendee ? (
        <React.Fragment>
          <Head>
            <title>{event.eventsiteModules.attendees}</title>
          </Head>
          <Component attendee={attendee} labels={labels} />
        </React.Fragment>
      ) : <PageLoader />}
    </Suspense>
  );

};

export default AttendeeDetail;
