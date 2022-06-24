import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import ExhibitorDetailPage from "components/pages/exhibitors/ExhibitorDetailPage";

const ExhibitorDetail = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutRoute>
                    <ExhibitorDetailPage />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default ExhibitorDetail