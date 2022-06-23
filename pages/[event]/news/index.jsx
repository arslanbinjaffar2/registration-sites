import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import NewsPage from "components/pages/news/NewsPage";

const Index = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutRoute>
                    <NewsPage />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default Index