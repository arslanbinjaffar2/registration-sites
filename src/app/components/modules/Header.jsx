import React, { Suspense, useMemo, useEffect, useState } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import {
  globalSelector,setShowLogin
} from "../../../store/Slices/GlobalSlice";

const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/header/${variation}`)
  );
  return Component;
};

const Header = ({location, history}) => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const { loadedSections } = useSelector(globalSelector);
  const [userExist, setUserExist] = useState(localStorage.getItem(`event${event.id}User`) ? true : false);
  let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["header"]);
  });
  useEffect(() => {
    const routeChange = history.listen((location, action) => {
      setUserExist(localStorage.getItem(`event${event.id}User`) ? true : false )
    })
  
    return () => {
      routeChange.unlisten;
    }
  }, [])
  
  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["slug"]),
    [event]
  );

  const onLoginClick = (bool) =>{
    dispatch(setShowLogin(bool));
  }
    
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component event={event} loaded={loadedSections} userExist={userExist}  location={location} setShowLogin={onLoginClick} />
    </Suspense>
  );
};

export default withRouter(Header);
