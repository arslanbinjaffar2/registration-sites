import React, { Suspense, useMemo, useEffect, useState } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  globalSelector, setShowLogin, incrementFetchLoadCount
} from "store/Slices/GlobalSlice";
import { useRouter } from "next/router";

const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/header/${variation}`)
  );
  return Component;
};

const Header = ({ location, history }) => {

  const { event } = useSelector(eventSelector);

  const dispatch = useDispatch();

  const router = useRouter();

  const { fetchLoadCount } = useSelector(globalSelector);

  const [userExist, setUserExist] = useState(typeof window !== 'undefined' && localStorage.getItem(`event${event.id}User`) ? true : false);

  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["header"]);
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleRouteChange = (url) => {
        document.getElementsByTagName('body')[0].classList.remove('un-scroll');
        setUserExist(localStorage.getItem(`event${event.id}User`) ? true : false);
      }

      router.events.on('routeChangeStart', handleRouteChange)

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      return () => {
        router.events.off('routeChangeStart', handleRouteChange)
      }
    }
  }, [])

  useEffect(() => {
    dispatch(incrementFetchLoadCount());
  }, [location])


  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  const onLoginClick = (bool) => {
    dispatch(setShowLogin(bool));
  }

  return (
    <Suspense fallback={''}>
      <Component event={event} loaded={fetchLoadCount} userExist={userExist} location={location} setShowLogin={onLoginClick} />
    </Suspense>
  );
};

export default Header;
