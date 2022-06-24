import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import SurveyDetail from "components/myAccount/profile/SurveyDetail";

const Detail = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutMyAccount>
                    <SurveyDetail />
                </MasterLayoutMyAccount>
            )}
        </>
    )

}

export default Detail