import React, {Suspense, lazy} from "react";
import Speaker from "@/modules/speakers/Speaker";
import { globalSelector } from "store/Slices/GlobalSlice";
import { useSelector } from "react-redux";
import PageLoader from "@/ui-components/PageLoader";

// const Speaker = lazy(() => import("@/modules/speakers/Speaker"));
const SpeakerPage = () => {
  // const { loadedSections, loadCount } = useSelector(globalSelector);
  return (
        <React.Fragment>
          <Speaker />
        </React.Fragment>
  );
};

export default SpeakerPage;
