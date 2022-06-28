import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import CmsListing from "components/modules/cms/CmsListing";
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter();

    const { menu_id } = router.query;
    const { event } = useSelector(eventSelector);

    return (
        <>
            {event && (
                <MasterLayoutRoute>
                    <CmsListing moduleName="practicalinformation" menu_id={menu_id} />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default Index