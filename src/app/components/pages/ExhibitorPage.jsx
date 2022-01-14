import React from "react";
import Exhibitor from "@/modules/Exhibitor";
import { globalSelector  } from "store/Slices/GlobalSlice";
import { useSelector } from "react-redux";
import PageLoader from "@/ui-components/PageLoader";
const ExhibitorPage = () => {
  const { loadedSections, loadCount } = useSelector(globalSelector);
 
  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}
      <Exhibitor pagination={true} />
    </React.Fragment>
  );
};

export default ExhibitorPage;
