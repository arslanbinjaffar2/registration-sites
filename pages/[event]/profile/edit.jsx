import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import MyProfileEdit from "components/myAccount/profile/MyProfileEdit";

const Edit = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutMyAccount>
                    <MyProfileEdit />
                </MasterLayoutMyAccount>
            )}
        </>
    )
}

export default Edit