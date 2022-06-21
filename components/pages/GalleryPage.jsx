import React from "react";
import Gallery from "components/modules/Gallery";
import { globalSelector } from "store/Slices/GlobalSlice";
import { useSelector } from "react-redux";

const GalleryPage = () => {

  return (
    <React.Fragment>
      <Gallery pagination={true} />
    </React.Fragment>
  );
};

export default GalleryPage;
