import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import SurveyList from "components/myAccount/profile/SurveyList";

const Index = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutMyAccount>
                    <SurveyList />
                </MasterLayoutMyAccount>
            )}
        </>
    )

}

export default Index