import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import NewsDetail from 'components/modules/news/NewsDetail';
import { metaInfo } from 'helpers/helper';
import PageLoader from "components/ui-components/PageLoader";

const ExhibitorDetail = (props) => {

    const { event } = useSelector(eventSelector);

    return (
        <>
            <Head>
            <title>{props.news.title}</title>
            <meta property="og:title" content={props.news.title} />
            <meta property="og:type" content="Event" />
            {props.metaInfo.eventsiteSettings && props.metaInfo.eventsiteSettings.search_engine_visibility == 0 &&
                            <meta name="robots" content="noindex"></meta>
                        }
            <meta
                property="og:image"
                content={
                        props.news.image
                        ? process.env.NEXT_APP_EVENTCENTER_URL +
                        "/assets/eventsite_news/" +
                        props.news.image
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
                                  props.news.image
                                  ? process.env.NEXT_APP_EVENTCENTER_URL +
                                  "/assets/eventsite_news/" +
                                  props.news.image
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
                    <NewsDetail />
                </MasterLayoutRoute>
            ) : (
                <PageLoader />
            )}
        </>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.NEXT_APP_URL}/event/${context.query.event}/news/${context.query.id}/detail`);
    const res = await response.json();
    const rota = await metaInfo(`${process.env.NEXT_APP_URL}/event/${context.query.event}/meta-info`, '');
    return {
        props: {
            metaInfo: rota,
            news:res.data,
            url: context.resolvedUrl
        },
    }
}

export default ExhibitorDetail