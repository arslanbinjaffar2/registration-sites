import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import Gallery from "components/modules/Gallery";


const Index = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            {event && (
                <MasterLayoutRoute>
                    <Gallery pagination={true} />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default Index