import React from "react";
import Speaker from "@/modules/speakers/Speaker";
import { globalSelector } from "store/Slices/GlobalSlice";
import { useSelector } from "react-redux";
import PageLoader from "@/ui-components/PageLoader";
const SpeakerPage = () => {
  const { loadedSections, loadCount } = useSelector(globalSelector);
  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}
      <Speaker />
    </React.Fragment>
  );
};

export default SpeakerPage;
