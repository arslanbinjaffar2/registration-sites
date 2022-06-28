import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import NewsDetail from 'components/modules/news/NewsDetail';


const ExhibitorDetail = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            {event && (
                <MasterLayoutRoute>
                    <NewsDetail />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default ExhibitorDetail