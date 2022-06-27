import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import MyBillingPage from "components/myAccount/profile/MyBilling";

const MyBilling = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutMyAccount>
                    <MyBillingPage />
                </MasterLayoutMyAccount>
            )}
        </>
    )

}

export default MyBilling