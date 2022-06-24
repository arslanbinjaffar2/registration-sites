import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import AfterLoginSubRegistration from "components/myAccount/profile/AfterLoginSubRegistration";

const SubRegistrationAfterLogin = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutMyAccount>
                    <AfterLoginSubRegistration />
                </MasterLayoutMyAccount>
            )}
        </>
    )

}

export default SubRegistrationAfterLogin