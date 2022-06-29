import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutMyAccount from "components/layout/MasterLayoutMyAccount";
import ManageNewsLetter from "components/myAccount/profile/ManageNewsLetter";
import { metaInfo } from 'helpers/helper';
import MetaInfo from "components/layout/MetaInfo";

const NewsLetterSubscription = (props) => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <MetaInfo metaInfo={props.metaInfo} />
            {event && (
                <MasterLayoutMyAccount>
                    <ManageNewsLetter />
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

export default NewsLetterSubscription