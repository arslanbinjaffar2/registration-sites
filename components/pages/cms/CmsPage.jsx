import React, { Suspense } from "react";
import CmsListing from "components/modules/cms/CmsListing";
const CmsPage = ({ match, event, location }) => {
  const currentModuleName = match.url.split("/")[2];
  return (
        <CmsListing moduleName={currentModuleName} menu_id={new URLSearchParams(location.search).get("menu_id")} />
        );
};

export default CmsPage;
