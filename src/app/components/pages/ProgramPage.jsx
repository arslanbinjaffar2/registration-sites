import React, { useEffect } from "react";
import Program from "../modules/Program";
import {
  globalSelector,
  incrementLoadCount,
  setLSandLC,
} from "../../../store/Slices/GlobalSlice";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../ui-components/PageLoader";
const PragramPage = () => {
  const dispatch = useDispatch();
  const { loadedSections, loadCount } = useSelector(globalSelector);
  useEffect(() => {
    dispatch(setLSandLC({ls:0,lc:1}));
  }, []);
  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}
      <Program pagination={false} />
    </React.Fragment>
  );
};

export default PragramPage;
