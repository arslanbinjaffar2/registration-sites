import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import SponsorListing from "components/modules/sponsor/SponsorListing";
import { metaInfo } from 'helpers/helper';
import MetaInfo from "components/layout/MetaInfo";

const Index = (props) => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <MetaInfo metaInfo={props.metaInfo} />
            {event && (
                <MasterLayoutRoute>
                    <SponsorListing />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            metaInfo: await metaInfo(`${process.env.NEXT_APP_URL}/event/${context.query.event}/meta-info`, ''),
            url: context.resolvedUrl
        },
    }
}

export default Index