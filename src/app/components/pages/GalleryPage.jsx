import React from "react";
import Gallery from "../modules/Gallery";
import { globalSelector } from "../../../store/Slices/GlobalSlice";
import { useSelector } from "react-redux";
import PageLoader from "../ui-components/PageLoader";

const GalleryPage = () => {
  const { loadedSections, loadCount } = useSelector(globalSelector);

  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}
      <Gallery pagination={true} />
    </React.Fragment>
  );
};

export default GalleryPage;
