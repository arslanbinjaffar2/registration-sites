import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import ManageNewsLetter from "components/myAccount/profile/ManageNewsLetter";

const NewsLetterSubscription = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutMyAccount>
                    <ManageNewsLetter />
                </MasterLayoutMyAccount>
            )}
        </>
    )
    
}

export default NewsLetterSubscription