import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import MetaInfo from "components/layout/MetaInfo";
import PageLoader from "components/ui-components/PageLoader";
import Home from "components/Index";
import { metaInfo } from 'helpers/helper';

const Index = (props) => {

    const { event, loading } = useSelector(eventSelector);

    return (
        <>
            <MetaInfo metaInfo={props.metaInfo} />
            {event ? (
                <MasterLayoutRoute event={event}>
                    <Home />
                </MasterLayoutRoute>
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

export default Index