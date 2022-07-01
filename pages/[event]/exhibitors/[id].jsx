import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import Detail from "components/modules/exhibitor/ExhibitorDetail";
import { metaInfo } from 'helpers/helper';
import MetaInfo from "components/layout/MetaInfo";
import PageLoader from "components/ui-components/PageLoader";

const ExhibitorDetail = (props) => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <MetaInfo metaInfo={props.metaInfo} />
            {event ? (
                <MasterLayoutRoute event={event}>
                    <Detail />
                </MasterLayoutRoute>
            ) : (
                <PageLoader />
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

export default ExhibitorDetail