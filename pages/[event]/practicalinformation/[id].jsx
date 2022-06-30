import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import CmsDetail from 'components/modules/cms/CmsDetail';
import { metaInfo } from 'helpers/helper';
import MetaInfo from "components/layout/MetaInfo";
import PageLoader from "components/ui-components/PageLoader";

const ExhibitorDetail = (props) => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head>
            <title>{props.cmsPage.name}</title>
            <meta property="og:title" content={props.cmsPage.name} />
            <meta property="og:type" content="Event" />
            <meta
                property="og:image"
                content={
                  props.cmsPage.image && props.cmsPage.image !== "" 
                        ?  process.env.NEXT_APP_EVENTCENTER_URL +
                        `/assets/event_info/` +
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
                              `/assets/event_info/` +
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
                        <link
                            rel="icon"
                            type="image/x-icon"
                            href={
                                props.metaInfo.settings.app_icon && props.metaInfo.settings.app_icon !== ""
                                    ? process.env.NEXT_APP_EVENTCENTER_URL +
                                    "/assets/event/branding/" +
                                    props.metaInfo.settings.app_icon
                                    : require("public/img/square.jpg")
                            }
                        />
                        
            </Head>
            {event ? (
                <MasterLayoutRoute>
                    <CmsDetail moduleName="practicalinformation" />
                </MasterLayoutRoute>
            ) : (
                <PageLoader />
            )}
        </>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.NEXT_APP_URL}/event/${context.query.event}/practicalinformation/page/${context.query.id}`);
    const res = await response.json();
    return {
        props: {
            metaInfo: await metaInfo(`${process.env.NEXT_APP_URL}/event/${context.query.event}/meta-info`, ''),
            cmsPage:res.data,
            url: context.resolvedUrl
        },
    }
}

export default ExhibitorDetail