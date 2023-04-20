import React, {useEffect} from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';

const pageview = (GA_MEASUREMENT_ID, url) => {
    if(window !== undefined){
        window.gtag("config", GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }

};


const MetaInfo = (props) => {
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url) => {
            if(props.metaInfo.settings.google_analytics){
                pageview(props.metaInfo.settings.google_analytics, url);
            }
        };
        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

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
                        {(props.metaInfo.settings.fav_icon && props.metaInfo.settings.fav_icon !== "") && <link
                            rel="icon"
                            type="image/x-icon"
                            href={`${process.env.NEXT_APP_EVENTCENTER_URL}/assets/event/branding/${props.metaInfo.settings.fav_icon}`}
                        />}
                    </>
                )}

            </Head>
            {props.metaInfo.settings.google_analytics && props.cookie !== null && props.cookie == "all" &&  (
                <>
                <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${props.metaInfo.settings.google_analytics}`} />
                <Script id='google-analytics' strategy="afterInteractive" dangerouslySetInnerHTML={{__html:`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${props.metaInfo.settings.google_analytics}', {
                        page_path: window.location.pathname,
                        });
                    `}}/>
                </>

            )}
        </>
    )
}

export default MetaInfo