import React from "react";
import Video from "@/modules/Video";
import { globalSelector } from "store/Slices/GlobalSlice";
import { useSelector } from "react-redux";
import PageLoader from "@/ui-components/PageLoader";

const VideoPage = () => {
  return (
    <React.Fragment>
      <Video pagination={true} />
    </React.Fragment>
  );
};

export default VideoPage;
