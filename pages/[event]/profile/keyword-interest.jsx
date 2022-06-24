import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import ManageKeywords from "components/myAccount/profile/ManageKeywords";

const KeywordInterest = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutMyAccount>
                    <ManageKeywords />
                </MasterLayoutMyAccount>
            )}
        </>
    )
    
}

export default KeywordInterest