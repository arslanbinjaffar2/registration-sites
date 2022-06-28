import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import Home from "components/Index";

const Index = () => {

    const { event, loading } = useSelector(eventSelector);

    return (
        <>
            {event && (
                <MasterLayoutRoute>
                    <Home />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default Index