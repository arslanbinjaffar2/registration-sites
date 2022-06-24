import React, {Suspense} from "react";
import Attendee from "components/modules/attendees/Attendee";
import {
  globalSelector,
} from "store/Slices/GlobalSlice";
import {  useSelector } from "react-redux";
import PageLoader from "components/ui-components/PageLoader";
const AttendeesPage = () => {
  // const { loadedSections, loadCount } = useSelector(globalSelector);
  return (
    <Suspense fallback={<PageLoader/>}>
      <React.Fragment>
        {/* {loadedSections !== loadCount && <PageLoader />} */}
        <Attendee pagination={true} />
      </React.Fragment>
    </Suspense>
  );
};

export default AttendeesPage;
