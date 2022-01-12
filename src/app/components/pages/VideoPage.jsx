import React, { useEffect } from "react";
import Video from "../modules/Video";
import {
  globalSelector,
  incrementLoadCount,
  setLSandLC,
} from "../../../store/Slices/GlobalSlice";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../ui-components/PageLoader";

const VideoPage = () => {
  const dispatch = useDispatch();
  const { loadedSections, loadCount } = useSelector(globalSelector);
  useEffect(() => {
    dispatch(setLSandLC({ls:0,lc:1}));
  }, []);
  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}
      <Video pagination={true} />
    </React.Fragment>
  );
};

export default VideoPage;
