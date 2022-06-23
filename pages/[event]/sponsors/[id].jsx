import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import SponsorDetailPage from "components/pages/sponsors/SponsorDetailPage";

const SponsorDetail = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutRoute>
                    <SponsorDetailPage />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default SponsorDetail