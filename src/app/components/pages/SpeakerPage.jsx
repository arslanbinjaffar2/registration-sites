import React, { useEffect } from "react";
import Speaker from "../modules/Speaker";
import {
  globalSelector,
  incrementLoadCount,
} from "../../../store/Slices/GlobalSlice";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../ui-components/PageLoader";
const SpeakerPage = () => {
  const dispatch = useDispatch();
  const { loadedSections, loadCount } = useSelector(globalSelector);
  useEffect(() => {
    dispatch(incrementLoadCount());
  }, []);
  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}
      <Speaker pagination={true} />
    </React.Fragment>
  );
};

export default SpeakerPage;
