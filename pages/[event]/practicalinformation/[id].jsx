import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import CmsDetailPage from "components/pages/cms/CmsDetailPage";

const ExhibitorDetail = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutRoute>
                    <CmsDetailPage module="practicalinformation" />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default ExhibitorDetail