import React, { Suspense, useMemo, useEffect, useState } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import {
  globalSelector,setShowLogin, incrementFetchLoadCount
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
  const { fetchLoadCount } = useSelector(globalSelector);
  const [userExist, setUserExist] = useState(localStorage.getItem(`event${event.id}User`) ? true : false);
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["header"]);
  });
  useEffect(() => {
    const routeChange = history.listen((location, action) => {
      setUserExist(localStorage.getItem(`event${event.id}User`) ? true : false );

    })

    return () => {
      routeChange.unlisten;
    }
  }, [])

  useEffect(() => {
    dispatch(incrementFetchLoadCount());
  }, [location])
  

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  const onLoginClick = (bool) =>{
    dispatch(setShowLogin(bool));
  }
    
  return (
    <Suspense fallback={''}>
      <Component event={event} loaded={fetchLoadCount}  userExist={userExist}  location={location} setShowLogin={onLoginClick} />
    </Suspense>
  );
};

export default withRouter(Header);
