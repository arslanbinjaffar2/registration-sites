import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import CorporateLogin from "components/CorporateLogin";
import { metaInfo } from 'helpers/helper';
import MetaInfo from "components/layout/MetaInfo";

const Index = (props) => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <MetaInfo metaInfo={props.metaInfo} />
            {event && (
                <MasterLayoutRoute>
                    <CorporateLogin />
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