import React, { Suspense, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import moment from 'moment';

// import {
//   incrementLoadCount,
// } from "store/Slices/GlobalSlice";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/documents/documentsListing`)
  );
  return Component;
};

const Documents = () => {
  const { event } = useSelector(eventSelector);
  // const dispatch = useDispatch();
  // const eventUrl = event.url;
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["register_now"]);
  });
  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  const registerDateEnd = useMemo(()=>{
    let currentDate = moment();
    let endDate = event.eventsiteSettings.registration_end_date !== "0000-00-00 00:00:00" ? moment(event.eventsiteSettings.registration_end_date) :  moment(event.end_date);
    let diff = currentDate.diff(endDate) > 0;
    return diff
  },[event]);
  
  const checkTickets = useMemo(()=>{
    let ticketsSet = false;
    if(parseFloat(event.eventsiteSettings.ticket_left) > 0){
        ticketsSet = true;
    }
    let remainingTickets =  event.eventsiteSettings.ticket_left - event.totalAttendees;

    return { ticketsSet, remainingTickets };
  },[event]);

  const waitingList = useMemo(()=>{
    if(event.waitinglistSettings){
        return event.waitinglistSettings.status;
    } 
    return 0;
  },[event]);

  return (
    <Suspense fallback={''}>
       <Component eventSiteSettings={event.eventsiteSettings} labels={event.labels} registerDateEnd={registerDateEnd} checkTickets={checkTickets}  waitingList={waitingList} moduleVariation={moduleVariation[0]} /> 
    </Suspense>
  );
};

export default withRouter(Documents);
