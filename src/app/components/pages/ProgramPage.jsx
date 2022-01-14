import React from "react";
import Program from "@/modules/Program";
import { globalSelector } from "store/Slices/GlobalSlice";
import { useSelector } from "react-redux";
import PageLoader from "@/ui-components/PageLoader";
const PragramPage = () => {
  const { loadedSections, loadCount } = useSelector(globalSelector);

  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}
      <Program pagination={false} />
    </React.Fragment>
  );
};

export default PragramPage;
