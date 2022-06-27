import Head from 'next/head'
import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import Home from "components/Index";

const Index = () => {

    const { event, loading } = useSelector(eventSelector);

    return (
        <>
            <Head>
                {!loading && event && (
                    <>
                        <title>{event.name}</title>
                        <meta property="og:title" content={event.name} />
                        <meta property="og:type" content="Event" />
                        {event.eventsiteSettings.search_engine_visibility == 0 &&
                            <meta name="robots" content="noindex"></meta>
                        }
                        <meta
                            property="og:url"
                            content={`${window.location.origin.toString()}/${event.url}`}
                        />
                        <meta
                            property="og:image"
                            content={
                                event.settings.social_media_logo &&
                                    event.settings.social_media_logo !== ""
                                    ? process.env.NEXT_APP_EVENTCENTER_URL +
                                    "/assets/event/social_media/" +
                                    event.settings.social_media_logo
                                    : event.settings.header_logo &&
                                        event.settings.header_logo !== ""
                                        ? process.env.NEXT_APP_EVENTCENTER_URL +
                                        "/assets/event/branding/" +
                                        event.settings.header_logo
                                        : process.env.NEXT_APP_EVENTCENTER_URL +
                                        "/_eventsite_assets/images/eventbuizz_logo-1.png"
                            }
                        />
                        <meta
                            property="twitter:image"
                            content={
                                event.settings.social_media_logo &&
                                    event.settings.social_media_logo !== ""
                                    ? process.env.NEXT_APP_EVENTCENTER_URL +
                                    "/assets/event/social_media/" +
                                    event.settings.social_media_logo
                                    : event.settings.header_logo &&
                                        event.settings.header_logo !== ""
                                        ? process.env.NEXT_APP_EVENTCENTER_URL +
                                        "/assets/event/branding/" +
                                        event.settings.header_logo
                                        : process.env.NEXT_APP_EVENTCENTER_URL +
                                        "/_eventsite_assets/images/eventbuizz_logo-1.png"
                            }
                        />
                        <meta property="twitter:card" content="summary_large_image" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="msapplication-config" content="none" />
                        <meta
                            property="og:description"
                            content={
                                event.description && event.description.info
                                    ? event.description.info.description
                                    : event.name
                            }
                        />
                        <link
                            rel="icon"
                            type="image/x-icon"
                            href={
                                event.settings.app_icon && event.settings.app_icon !== ""
                                    ? process.env.NEXT_APP_EVENTCENTER_URL +
                                    "/assets/event/branding/" +
                                    event.settings.app_icon
                                    : require("public/img/square.jpg")
                            }
                        />
                        {event.settings.google_analytics && (
                            <script
                                async
                                src="https://www.google-analytics.com/analytics.js"
                            />
                        )}
                        {event.settings.google_analytics && (
                            <script>
                                {`
                                        window.ga=window.ga||function()
                                        {(ga.q = ga.q || []).push(arguments)}
                                        ;ga.l=+new Date; ga('create',
                                        '${event.settings.google_analytics}', 'auto'); ga('send',
                                        'pageview');
                                    `}
                            </script>
                        )}
                    </>
                )}
            </Head>

            {event && (
                <MasterLayoutRoute>
                    <Home />
                </MasterLayoutRoute>
            )}
        </>
    )
}

export default Index