import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import AfterLoginSubRegistration from "components/myAccount/profile/AfterLoginSubRegistration";
import { metaInfo } from 'helpers/helper';
import MetaInfo from "components/layout/MetaInfo";
import PageLoader from "components/ui-components/PageLoader";

const SubRegistrationAfterLogin = (props) => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <MetaInfo metaInfo={props.metaInfo} />
            {event ? (
                <MasterLayoutMyAccount>
                    <AfterLoginSubRegistration />
                </MasterLayoutMyAccount>
            ) : (
                <PageLoader />
            )}
        </>
    )

}

export async function getServerSideProps(context) {
    const eventData = await metaInfo(`${process.env.NEXT_APP_URL}/event/${context.query.event}/meta-info`, '');
    return {
        props: {
            metaInfo: eventData,
            url: context.resolvedUrl
        },
    }
}

export default SubRegistrationAfterLogin