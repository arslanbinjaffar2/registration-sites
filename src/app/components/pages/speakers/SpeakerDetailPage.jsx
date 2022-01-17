import React from "react";
import SpeakerDetail from "@/modules/speakers/SpeakerDetail";
import { globalSelector } from "store/Slices/GlobalSlice";
import { useSelector } from "react-redux";
import PageLoader from "@/ui-components/PageLoader";
const SpeakerPage = () => {
  const { loadedSections, loadCount } = useSelector(globalSelector);
  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}
      <SpeakerDetail />
    </React.Fragment>
  );
};

export default SpeakerPage;
