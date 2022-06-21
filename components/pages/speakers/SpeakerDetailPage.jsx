import React from "react";
import SpeakerDetail from "components/modules/speakers/SpeakerDetail";
import { globalSelector } from "store/Slices/GlobalSlice";
import { useSelector } from "react-redux";
import PageLoader from "components/ui-components/PageLoader";
const SpeakerPage = () => {
  return (
    <React.Fragment>
      <SpeakerDetail />
    </React.Fragment>
  );
};

export default SpeakerPage;
