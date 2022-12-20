import React, { Suspense, useEffect, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import moment from "moment";
import {
  globalSelector,
  fetchBanner,
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/banner/${variation}`)
  );
  return Component;
};

const Banner = () => {
  const { event } = useSelector(eventSelector);
  const { banner, settings } = useSelector(globalSelector);
  const dispatch = useDispatch();

  const eventUrl = event.url;
  
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["top_banner"]);
  });

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  const regisrationUrl = useMemo(()=>{
    let url = '';
    if(parseFloat(event.registration_form_id) === 1){
        url = (event.paymentSettings && parseInt(event.paymentSettings.evensite_additional_attendee) === 1) ? `${process.env.NEXT_APP_REGISTRATION_FLOW_URL}/${event.url}/attendee` : `${process.env.NEXT_APP_REGISTRATION_FLOW_URL}/${event.url}/attendee/manage-attendee`;
    }else{
      url = `${process.env.NEXT_APP_EVENTCENTER_URL}/event/${event.url}/detail/${event.eventsiteSettings.payment_type === 0 ? 'free/' : ''}registration`;
    }

    return url;
  },[event]);

  useEffect(() => {
    if (banner === null) {
      dispatch(incrementLoadCount());
      dispatch(fetchBanner(eventUrl));
    }
  }, [dispatch]);
  return (
    <Suspense fallback={<div></div>}>
      {banner && banner?.length > 0 ? <Component regisrationUrl={regisrationUrl} settings={settings} banner={banner} event={event} countdown={event.eventsiteSettings.registration_end_date !== "0000-00-00 00:00:00" ? moment(event.eventsiteSettings.registration_end_date): null} /> : null}
    </Suspense>
  );
};

export default Banner;
