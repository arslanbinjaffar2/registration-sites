import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import ExhibitorPage from "components/pages/exhibitors/ExhibitorPage";

const Index = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutRoute>
                    <ExhibitorPage />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default Index