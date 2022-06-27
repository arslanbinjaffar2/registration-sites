import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import MySubRegistrationPage from "components/myAccount/profile/MySubRegistration";

const MySubRegistration = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutMyAccount>
                    <MySubRegistrationPage />
                </MasterLayoutMyAccount>
            )}
        </>
    )

}

export default MySubRegistration