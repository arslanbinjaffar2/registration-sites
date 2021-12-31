import React, { useEffect } from "react";
import Attendee from "../modules/Attendee";
import {
  globalSelector,
  setLoadCount,
} from "../../../store/Slices/GlobalSlice";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../ui-components/PageLoader";
const AttendeesPage = () => {
  const dispatch = useDispatch();
  const { loadedSections, loadCount } = useSelector(globalSelector);
  useEffect(() => {
    dispatch(setLoadCount(1));
  }, []);
  return (
    <div>
      {loadedSections !== loadCount && <PageLoader />}
      <Attendee pagination={true} />
    </div>
  );
};

export default AttendeesPage;
