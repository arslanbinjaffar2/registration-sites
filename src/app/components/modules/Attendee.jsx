import React, { Suspense, useEffect, useState } from "react";
import { service } from "../../services/service";
import { eventSelector } from '../../../store/Slices/EventSlice'
import {  useSelector } from 'react-redux'
const in_array = require("in_array");
function loadModule(theme, variation) {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/attendee/${variation}`)
  );
  return Component;
}
const Attendee = (props) => {
   const { event } = useSelector(eventSelector)
   let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["attendee"]);
   });
  const CustomComponent = loadModule(event.theme.slug, moduleVariation[0]['slug']);
  const [attendee, setAttendee] = useState(null);
  useEffect(() => {
    loadAttendees();
  }, []);
  const loadAttendees = async () => {
    await  service.get(`${process.env.REACT_APP_URL}/event/${event.url}/attendees`).then(
            response => {
                setAttendee(response.data);
            }
    )
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomComponent attendees={attendee} />
    </Suspense>
  );
};


export default Attendee;
