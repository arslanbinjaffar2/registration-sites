import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import CmsDetail from 'components/modules/cms/CmsDetail';


const ExhibitorDetail = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            {event && (
                <MasterLayoutRoute>
                    <CmsDetail moduleName="general_information" />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default ExhibitorDetail