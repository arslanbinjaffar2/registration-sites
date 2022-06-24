import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import MyProgramPage from "components/myAccount/profile/MyProgram";

const MyProgram = () => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head></Head>
            {event && (
                <MasterLayoutMyAccount>
                    <MyProgramPage />
                </MasterLayoutMyAccount>
            )}
        </>
    )

}

export default MyProgram