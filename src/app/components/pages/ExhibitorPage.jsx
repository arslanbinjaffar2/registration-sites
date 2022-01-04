import React, { useEffect } from "react";
import Exhibitor from "../modules/Exhibitor";
import { globalSelector, incrementLoadCount,  } from "../../../store/Slices/GlobalSlice";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../ui-components/PageLoader";
const ExhibitorPage = () => {
  const dispatch = useDispatch();
  const { loadedSections, loadCount } = useSelector(globalSelector);
  useEffect(() => {
    dispatch(incrementLoadCount());
  }, []);
  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}
      <Exhibitor pagination={true} />
    </React.Fragment>
  );
};

export default ExhibitorPage;
