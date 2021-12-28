import React from 'react';
import { Route } from 'react-router-dom';
import { Translation } from "react-i18next";

const MasterLayout = ({ children, ...rest, history }) => {
    return (
        <Translation>
            {t => (
                children
            )}
        </Translation>
    );
}

const MasterLayoutRoute = (props) => {
    const { component: Component, ...rest } = props;
    return (
        <Route {...rest} render={matchProps => (
            <MasterLayout history={props.history}>
                <Component
                    {...matchProps} />
            </MasterLayout>
        )} />
    )
}

export default MasterLayoutRoute