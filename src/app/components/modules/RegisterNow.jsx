import React, { Suspense, useMemo } from "react";
import { eventSelector } from "store/Slices/EventSlice";
// import {
//   incrementLoadCount,
// } from "store/Slices/GlobalSlice";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/register-now/${variation}`)
  );
  return Component;
};

const RegisterNow = () => {
  const { event } = useSelector(eventSelector);
  // const dispatch = useDispatch();
  // const eventUrl = event.url;
  let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["register_now"]);
  });
  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["slug"]),
    [event]
  );
  // useEffect(() => {
  //   console.log("loaded rg");
    // if (banner === null) {
    //   dispatch(incrementLoadCount());
    // }
  // }, []);
  return (
    <Suspense fallback={<div></div>}>
       <Component /> 
    </Suspense>
  );
};

export default withRouter(RegisterNow);
