import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import AttendeeDetailPage from "components/pages/attendees/AttendeeDetailPage";

const AttendeeDetail = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutRoute>
                    <AttendeeDetailPage />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default AttendeeDetail