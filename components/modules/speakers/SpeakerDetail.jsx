import React, { Suspense, useEffect, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "components/ui-components/PageLoader";
import { speakerDetailSelector, fetchSpeakerDetail, clearState } from "store/Slices/SpeakerDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/speaker/detail/${variation}`)
  );
  return Component;
};

const SpeakerDetail = (props) => {

  const router = useRouter();

  const { id } = router.query;

  const { event } = useSelector(eventSelector);

  const { speaker, labels } = useSelector(speakerDetailSelector);

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
  }, [id]);

  return (
    <Suspense fallback={<PageLoader />}>
      {speaker ? (
        <React.Fragment>
          <Component speaker={speaker} labels={labels} moduleName={event.eventsiteModules.speakers} siteLabels={event.labels} eventUrl={eventUrl} eventLanguageId={event.language_id} showWorkshop={event.eventsiteSettings.agenda_collapse_workshop} />
        </React.Fragment>
      ) : <PageLoader />}
    </Suspense>
  );
};

export default SpeakerDetail;
