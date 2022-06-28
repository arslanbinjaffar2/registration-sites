import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { sponsorDetailSelector, fetchSponsor, clearState } from "store/Slices/SponsorDetailSlice";
import PageLoader from "components/ui-components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import Head from "next/head";
import PageHeader from "../PageHeader";
const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/sponsor/detail/SponsorDetail`)
  );
  return Component;
};

const SponsorDetail = (props) => {

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
    dispatch(fetchSponsor(eventUrl, id));
    return () => {
      dispatch(clearState());
    }
  }, []);

  const { sponsor, labels, documents, loading, error } = useSelector(sponsorDetailSelector);

  return (
    <Suspense fallback={<PageLoader />}>
      {sponsor ? (
        <React.Fragment>
          <Head>
          <title>{event.eventsiteModules.sponsors}</title>
          </Head>
          <PageHeader label={event.eventsiteModules.sponsors} />
          <Component sponsor={sponsor} labels={labels} documents={documents} sponsorSettings={event.sponsor_settings} moduleName={event.eventsiteModules.sponsors} />
        </React.Fragment>
      ) : <PageLoader />
      }
    </Suspense>
  );
};

export default SponsorDetail;
