import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { sponsorSelector, fetchSponsors } from "store/Slices/SponsorSlice";
import {
  incrementLoadCount,
  incrementFetchLoadCount
} from "store/Slices/GlobalSlice";
import PageLoader from "components/ui-components/PageLoader";

import { useSelector, useDispatch } from "react-redux";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/sponsor/${variation}`)
  );
  return Component;
};

const Sponsor = (props) => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;

  const checkModuleTopStatus = useMemo(()=>(event?.header_data?.top_menu.findIndex((item)=>(item.alias === 'sponsors'))),[event]);

  const checkModuleHomeStatus = useMemo(()=>(event?.layoutSections?.findIndex((item)=>(item.module_alias === 'sponsor'))),[event]);

  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["sponsor"]);
  });

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  const { sponsorsByCategories, labels,  loading, error} = useSelector(sponsorSelector);
  
    useEffect(() => {
      if(checkModuleTopStatus < 0 && checkModuleHomeStatus < 0){
        router.push(`/${eventUrl}`);
      }
      if(sponsorsByCategories === null) {
        dispatch(incrementLoadCount());
        dispatch(fetchSponsors(eventUrl));
      }else{
        dispatch(incrementFetchLoadCount());
      }
    }, []);
  return (
    <Suspense fallback={''}>
      {sponsorsByCategories && sponsorsByCategories.length > 0 ? (
        <React.Fragment>
          <Component sponsorsByCategories={sponsorsByCategories} labels = {labels} siteLabels={event.labels} settings={moduleVariation[0]} eventUrl={eventUrl} />
        </React.Fragment>
      ) : null 
      }
    </Suspense>
  );
};

export default Sponsor;
