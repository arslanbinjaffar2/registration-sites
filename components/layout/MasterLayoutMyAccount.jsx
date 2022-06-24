import React, { useEffect } from 'react';
import Header from "components/modules/Header";
import {
  subRegistrationSelector,
} from "store/Slices/myAccount/subRegistrationSlice";
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import {
  eventSelector
} from "store/Slices/EventSlice";
import AfterLoginSubRegistration from "components/myAccount/profile/AfterLoginSubRegistration";

const MasterLayoutMyAccount = (props) => {

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
    <>
      <Header />
      {skip ? props.children : <AfterLoginSubRegistration {...props} />}
    </>
  )
}

export default MasterLayoutMyAccount