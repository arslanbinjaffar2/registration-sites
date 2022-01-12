import React, { useEffect } from "react";
import Gallery from "../modules/Gallery";
import {
  globalSelector,
  incrementLoadCount,
} from "../../../store/Slices/GlobalSlice";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../ui-components/PageLoader";

const GalleryPage = () => {
  const dispatch = useDispatch();
  const { loadedSections, loadCount } = useSelector(globalSelector);
  useEffect(() => {
    dispatch(incrementLoadCount());
  }, []);
  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}
      <Gallery pagination={true} />
    </React.Fragment>
  );
};

export default GalleryPage;
