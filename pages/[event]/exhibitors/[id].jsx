import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import Detail from "components/modules/exhibitor/ExhibitorDetail";


const ExhibitorDetail = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutRoute>
                    <Detail />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default ExhibitorDetail