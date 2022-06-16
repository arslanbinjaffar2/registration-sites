import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Translation } from "react-i18next";
import { useSelector } from "react-redux";

import {
    eventSelector
  } from "store/Slices/EventSlice";

const MasterLayout = ({ children, ...rest, history }) => {
    return (
        <Translation>
            {t => (
                children
            )}
        </Translation>
    );
}
function MasterLayoutMyAccount({ component: Component,history, ...rest }) {
  const {event} = useSelector(eventSelector);
  const isAuthenticated = localStorage.getItem(`event${event.id}User`);
  console.log("this", isAuthenticated);

  return (
    <Route {...rest} render={matchProps => (
        isAuthenticated ? <MasterLayout history={history}>
            <Component {...matchProps} />
        </MasterLayout> : <Redirect to={`/${event.url}`} />
    )} />
  );
}

export default MasterLayoutMyAccount;