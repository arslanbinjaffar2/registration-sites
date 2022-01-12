import React, { useEffect } from "react";
import Attendee from "../modules/Attendee";
import {
  globalSelector,
  incrementLoadCount,
} from "../../../store/Slices/GlobalSlice";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../ui-components/PageLoader";
const AttendeesPage = () => {
  const dispatch = useDispatch();
  const { loadedSections, loadCount } = useSelector(globalSelector);
  useEffect(() => {
    dispatch(incrementLoadCount());
  }, []);
  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}
      <Attendee pagination={true} />
    </React.Fragment>
  );
};

export default AttendeesPage;
