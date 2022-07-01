import React from 'react';
import Header from "components/modules/Header";
import LoginScreen from 'components/myAccount/login/LoginScreen';
import { useSelector } from "react-redux";
import {
    globalSelector
} from "store/Slices/GlobalSlice";

const MasterLayoutRoute = ({ children }) => {

    const { showLogin } = useSelector(globalSelector);

    return (
        <>
            <Header />
            {showLogin && <LoginScreen />}
            {children}
        </>
    )
}

export default MasterLayoutRoute