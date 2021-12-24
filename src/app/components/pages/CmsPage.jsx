import React from "react";
import GeneralInformation from "../modules/GeneralInformation";
import AdditionalInformation from "../modules/AdditionalInformation";
import PracticalInformation from "../modules/PracticalInformation";
import EventInformation from "../modules/EventInformation";

const CmsPage = ({ match }) => {
  const informationModules = {
    additional_information: <AdditionalInformation />,
    general_information: <GeneralInformation />,
    practicalinformation: <PracticalInformation />,
    event_information: <EventInformation />,
  };
  const currentModule = match.url.split("/")[2];
  return <div>{informationModules[currentModule]}</div>;
};

export default CmsPage;
