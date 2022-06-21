import React, { useEffect } from 'react';
import { Translation } from "react-i18next";
import AfterLoginSubRegistration from "components/myAccount/profile/AfterLoginSubRegistration";
import {
  subRegistrationSelector,
} from "store/Slices/myAccount/subRegistrationSlice";
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";

import {
  eventSelector
} from "store/Slices/EventSlice";

const MasterLayout = ({ children }) => {
  return (
    <Translation>
      {t => (
        children
      )}
    </Translation>
  );
}
function MasterLayoutMyAccount({ component: Component, history, ...rest }) {

  const { event } = useSelector(eventSelector);

  const { skip } = useSelector(subRegistrationSelector);

  const isAuthenticated = localStorage.getItem(`event${event.id}User`);

  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${event.url}`);
    }
  }, [isAuthenticated]);

  return (
    <MasterLayout history={history}>
      {skip ? <React.Fragment>
        <Component {...matchProps} />
      </React.Fragment> : <AfterLoginSubRegistration {...matchProps} />}
    </MasterLayout>
  );
}

export default MasterLayoutMyAccount;