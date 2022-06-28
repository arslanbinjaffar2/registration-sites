import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import ExhibitorListing from "components/modules/exhibitor/ExhibitorListing";


const Index = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            {event && (
                <MasterLayoutRoute>
                    <ExhibitorListing />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default Index