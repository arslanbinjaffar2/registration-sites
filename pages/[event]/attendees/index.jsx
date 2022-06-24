import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import AttendeesPage from "components/pages/attendees/AttendeesPage";

const Index = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutRoute>
                    <AttendeesPage />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default Index