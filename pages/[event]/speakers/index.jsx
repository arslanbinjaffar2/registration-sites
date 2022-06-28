import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import Speaker from "components/modules/speakers/Speaker";


const Index = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            {event && (
                <MasterLayoutRoute>
                    <Speaker />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default Index