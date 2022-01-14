import React from "react";
import Sponsor from "@/modules/Sponsor";
import { globalSelector } from "store/Slices/GlobalSlice";
import { useSelector } from "react-redux";
import PageLoader from "@/ui-components/PageLoader";
const SponsorPage = () => {
  const { loadedSections, loadCount } = useSelector(globalSelector);

  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}
      <Sponsor pagination={true} />
    </React.Fragment>
  );
};

export default SponsorPage;
