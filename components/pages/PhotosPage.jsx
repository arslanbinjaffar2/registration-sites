import React from "react";
import Gallery from "@/modules/Gallery";
import {
  globalSelector,
} from "store/Slices/GlobalSlice";
import {  useSelector } from "react-redux";
import PageLoader from "@/ui-components/PageLoader";
const PhotosPage = () => {
  
  return (
    <React.Fragment>
      <Gallery pagination={true} />
    </React.Fragment>
  );
};

export default PhotosPage;
