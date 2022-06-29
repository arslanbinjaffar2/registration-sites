import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import MySubRegistrationPage from "components/myAccount/profile/MySubRegistration";
import { metaInfo } from 'helpers/helper';
import MetaInfo from "components/layout/MetaInfo";

const MySubRegistration = (props) => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <MetaInfo metaInfo={props.metaInfo} />
            {event && (
                <MasterLayoutMyAccount>
                    <MySubRegistrationPage />
                </MasterLayoutMyAccount>
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

export default MySubRegistration