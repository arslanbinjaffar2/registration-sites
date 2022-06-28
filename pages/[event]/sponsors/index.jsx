import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import SponsorListing from "components/modules/sponsor/SponsorListing";


const Index = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            {event && (
                <MasterLayoutRoute>
                    <SponsorListing />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default Index