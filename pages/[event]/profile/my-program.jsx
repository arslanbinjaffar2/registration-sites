import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import MyProgramPage from "components/myAccount/profile/MyProgram";
import { metaInfo } from 'helpers/helper';
import MetaInfo from "components/layout/MetaInfo";
import PageLoader from "components/ui-components/PageLoader";

const MyProgram = (props) => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <MetaInfo metaInfo={props.metaInfo} />
            {event ? (
                <MasterLayoutMyAccount>
                    <MyProgramPage />
                </MasterLayoutMyAccount>
            ) : (
                <PageLoader />
            )}
        </>
    )

}

export async function getServerSideProps(context) {
    return {
        props: {
            metaInfo: await metaInfo(`${process.env.NEXT_APP_URL}/event/${context.query.event}/meta-info`, ''),
            url: context.resolvedUrl
        },
    }
}

export default MyProgram