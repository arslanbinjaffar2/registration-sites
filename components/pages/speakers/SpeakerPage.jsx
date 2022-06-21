import React, {Suspense, lazy} from "react";
import Speaker from "components/modules/speakers/Speaker";
import { globalSelector } from "store/Slices/GlobalSlice";
import { useSelector } from "react-redux";
import PageLoader from "components/ui-components/PageLoader";

// const Speaker = lazy(() => import("components/modules/speakers/Speaker"));
const SpeakerPage = () => {
  // const { loadedSections, loadCount } = useSelector(globalSelector);
  return (
        <React.Fragment>
          <Speaker />
        </React.Fragment>
  );
};

export default SpeakerPage;
