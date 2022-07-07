import React from 'react';
import Head from 'next/head'

const MetaInfo = (props) => {
    console.log(props.metaInfo.settings.third_party_header_script)
    return (
        <>
            <Head>
                {!props.metaInfo !== undefined && (

                    <>
                        <title>{props.metaInfo.name}</title>
                        <meta property="og:title" content={props.metaInfo.name} />
                        <meta property="og:type" content="Event" />
                        {props.metaInfo.eventsiteSettings && props.metaInfo.eventsiteSettings.search_engine_visibility == 0 &&
                            <meta name="robots" content="noindex"></meta>
                        }
                        <meta
                            property="og:url"
                            content={`${process.env.NEXT_APP_BASE_URL}/${props.metaInfo.url}`}
                        />
                        <meta
                            property="og:image"
                            content={
                                props.metaInfo.settings.social_media_logo &&
                                    props.metaInfo.settings.social_media_logo !== ""
                                    ? process.env.NEXT_APP_EVENTCENTER_URL +
                                    "/assets/event/social_media/" +
                                    props.metaInfo.settings.social_media_logo
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
                                props.metaInfo.settings.social_media_logo &&
                                    props.metaInfo.settings.social_media_logo !== ""
                                    ? process.env.NEXT_APP_EVENTCENTER_URL +
                                    "/assets/event/social_media/" +
                                    props.metaInfo.settings.social_media_logo
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
                        <meta
                            property="og:description"
                            content={
                                props.metaInfo.description && props.metaInfo.description.info
                                    ? props.metaInfo.description.info.description
                                    : props.metaInfo.name
                            }
                        />
                        <link
                            rel="icon"
                            type="image/x-icon"
                            href={
                                props.metaInfo.settings.app_icon && props.metaInfo.settings.app_icon !== ""
                                    ? process.env.NEXT_APP_EVENTCENTER_URL +
                                    "/assets/event/branding/" +
                                    props.metaInfo.settings.app_icon
                                    : ''
                            }
                        />
                        {props.metaInfo.settings.google_analytics && (
                            <script
                                async
                                src="https://www.google-analytics.com/analytics.js"
                            />
                        )}
                        {props.metaInfo.settings.google_analytics && (
                            <script>
                                {`
                    window.ga=window.ga||function()
                    {(ga.q = ga.q || []).push(arguments)}
                    ;ga.l=+new Date; ga('create',
                    '${props.metaInfo.settings.google_analytics}', 'auto'); ga('send',
                    'pageview');
                `}
                            </script>
                        )}
                        {props.metaInfo.settings.third_party_header_script && props.metaInfo.settings.third_party_header_script}
                    </>
                )}

            </Head>
        </>
    )
}

export default MetaInfo