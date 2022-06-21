import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "components/ui-components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/cms/CmsListing`)
  );
  return Component;
};

const CmsListing = (props) => {
const id = props.match.params.id;
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;

  
  const Component = useMemo(
    () => loadModule(event.theme.slug),
    [event]
    );
    
    const informationModules = {
      additional_information: "additional_info_menu",
      general_information: "general_info_menu",
      practicalinformation: "practical_info_menu",
    };
    

  return (
    <Suspense fallback={<PageLoader/>}>
        <React.Fragment>
         <Component listing={event.header_data[informationModules[props.moduleName]]} menu_id={props.menu_id} moduleName={props.moduleName} eventUrl={event.url} eventSiteModuleName={event.eventsiteModules[props.moduleName]} breadCrumbData={event.header_data[informationModules[props.moduleName]]} />}
        </React.Fragment>
    </Suspense>
  );
};

export default CmsListing;
