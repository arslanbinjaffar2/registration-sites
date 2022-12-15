import React, { Suspense, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector } from "react-redux";

const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/event_info/${variation}`)
  );
  return Component;
};

const EventInformation = () => {
  const { event } = useSelector(eventSelector);
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["event_info"]);
  });

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  console.log(process.env.NEXT_APP_REGISTRATION_FLOW_URL);
  const regisrationUrl = useMemo(()=>{
    let url = '';
    if(parseFloat(event.registration_form_id) === 1){
        url = (event.paymentSettings && parseInt(event.paymentSettings.evensite_additional_attendee) === 1) ? `${process.env.NEXT_APP_REGISTRATION_FLOW_URL}/${event.url}/attendee` : `${process.env.NEXT_APP_REGISTRATION_FLOW_URL}/${event.url}/attendee/manage-attendee`;
    }else{
      url = `${process.env.NEXT_APP_EVENTCENTER_URL}/event/${event.url}/detail/registration`;
    }

    return url;
  },[event]);


  return (
    <Suspense fallback={''}>
      <Component event={event} moduleVariation={moduleVariation[0]} labels={event.labels} regisrationUrl={regisrationUrl} />
    </Suspense>
  );
};

export default EventInformation;

