import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import Page from 'components/modules/PageBuilderPage/Page';
import { metaInfo } from 'helpers/helper';
import MetaInfo from "components/layout/MetaInfo";
import PageLoader from "components/ui-components/PageLoader";

const ExhibitorDetail = (props) => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head>
            <title>{props.cmsPage.name && props.cmsPage.name}</title>
            <meta property="og:title" content={props.cmsPage.name && props.cmsPage.name} />
            <meta property="og:type" content="Event" />
            <meta
                property="og:image"
                content={
                  props.cmsPage.image && props.cmsPage.image !== "" 
                        ?  process.env.NEXT_APP_EVENTCENTER_URL +
                        `/assets/additional_info/` +
                        props.cmsPage.image
                        : props.metaInfo.settings.header_logo &&
                            props.metaInfo.settings.header_logo !== ""
                            ? process.env.NEXT_APP_EVENTCENTER_URL +
                            "/assets/event/branding/" +
                            props.metaInfo.settings.header_logo
                            : process.env.NEXT_APP_EVENTCENTER_URL +
                            "/_eventsite_assets/images/eventbuizz_logo-1.png"
                }
            />
                        <meta
                            property="twitter:image"
                            content={
                              props.cmsPage.image && props.cmsPage.image !== "" 
                              ?  process.env.NEXT_APP_EVENTCENTER_URL +
                              `/assets/additional_info/` +
                              props.cmsPage.image
                                  : props.metaInfo.settings.header_logo &&
                                      props.metaInfo.settings.header_logo !== ""
                                      ? process.env.NEXT_APP_EVENTCENTER_URL +
                                      "/assets/event/branding/" +
                                      props.metaInfo.settings.header_logo
                                      : process.env.NEXT_APP_EVENTCENTER_URL +
                                      "/_eventsite_assets/images/eventbuizz_logo-1.png"
                            }
                        />
                        <meta property="twitter:card" content="summary_large_image" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="msapplication-config" content="none" />
                        {(props.metaInfo.settings.fav_icon && props.metaInfo.settings.fav_icon !== "") && <link
                            rel="icon"
                            type="image/x-icon"
                            href={`${process.env.NEXT_APP_EVENTCENTER_URL}/assets/event/branding/${props.metaInfo.settings.fav_icon}`}
                        />}
                        
            </Head>
            {event ? (
                <MasterLayoutRoute event={event}>
                    <Page  />
                </MasterLayoutRoute>
            ) : (
                <PageLoader />
            )}
        </>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.NEXT_APP_URL}/event/${context.query.event}/page/${context.query.id}`);
    const res = await response.json();
    const eventData = await metaInfo(`${process.env.NEXT_APP_URL}/event/${context.query.event}/meta-info`, '');

    return {
        props: {
            metaInfo:eventData,
            cmsPage: res.data,
            url: context.resolvedUrl
        },
    }
}

export default ExhibitorDetail