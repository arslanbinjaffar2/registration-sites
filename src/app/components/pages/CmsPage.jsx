import React, { Suspense } from "react";

function loadModule(name) {
  const Component = React.lazy(() => import(`@/modules/${name}`));
  return Component;
}
const CmsPage = ({ match, event }) => {
  const currentModuleName = match.url.split("/")[2];
  const informationModules = {
    additional_information: "AdditionalInformation",
    general_information: "GeneralInformation",
    practicalinformation: "PracticalInformation",
    event_information: "EventInformation",
  };
  const CurrentModule = loadModule(informationModules[currentModuleName]);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CurrentModule />
      </Suspense>
    </div>
  );
};

export default CmsPage;
