import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import AnsweredSurveyListing from "components/myAccount/profile/AnsweredSurveyListing";
import { metaInfo } from 'helpers/helper';
import MetaInfo from "components/layout/MetaInfo";
import PageLoader from "components/ui-components/PageLoader";

const Answered = (props) => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <MetaInfo metaInfo={props.metaInfo} />
            {event ? (
                <MasterLayoutMyAccount>
                    <AnsweredSurveyListing />
                </MasterLayoutMyAccount>
            ) : (
                <PageLoader />
            )}
        </>
    )

}

export async function getServerSideProps(context) {
    const eventData = await metaInfo(`${process.env.NEXT_APP_URL}/event/${context.query.event}/meta-info`, '');
    return {
        props: {
            metaInfo: eventData,
            url: context.resolvedUrl
        },
    }
}

export default Answered