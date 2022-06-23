import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import SpeakerDetailPage from "components/pages/speakers/SpeakerDetailPage";

const SpeakerDetail = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutRoute>
                    <SpeakerDetailPage />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default SpeakerDetail