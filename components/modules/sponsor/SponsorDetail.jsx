import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { sponsorDetailSelector, fetchSponsor, clearState } from "store/Slices/SponsorDetailSlice";
import PageLoader from "components/ui-components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import Head from "next/head";
import PageHeader from "../PageHeader";
import ActiveLink from "components/atoms/ActiveLink";
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
  
  const [breadCrumbs, setbreadCrumbs] = useState([
    {name:"Home page", url:`/${eventUrl}`, type:"link"},
    {name:"Sponsors", url:`/${eventUrl}/sponsors`, type:"link"},
    {name:"Overview of sponsor", url:"", type:"name"},
  ]);

  const { sponsor, labels, documents, loading, error } = useSelector(sponsorDetailSelector);

  return (
    <Suspense fallback={<PageLoader />}>
      {sponsor ? (
        <React.Fragment>
          <Head>
          <title>{event.eventsiteModules.sponsors}</title>
          </Head>
          <PageHeader label={event.labels.EVENTSITE_SPONSORS} desc={event.labels.EVENTSITE_SPONSORS_SUB} breadCrumbs={(type)=>{
            return ( <nav aria-label="breadcrumb" className={`ebs-breadcrumbs ${type !== "background" ? 'ebs-dark': ''}`}>
            <ul className="breadcrumb">
              {breadCrumbs.map((crumb, i) => (
                <li className="breadcrumb-item" key={i}>
                  {crumb.type === "name" ? crumb.name : <ActiveLink href={crumb.url} >{crumb.name}</ActiveLink>}
                </li>
              ))}
            </ul>
            </nav>)
        }} />
          <Component sponsor={sponsor} labels={event.labels} documents={documents} sponsorSettings={event.sponsor_settings} moduleName={event.eventsiteModules.sponsors} />
        </React.Fragment>
      ) : <PageLoader />
      }
    </Suspense>
  );
};

export default SponsorDetail;
