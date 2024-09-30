import React from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import MetaInfo from "components/layout/MetaInfo";
import PageLoader from "components/ui-components/PageLoader";
import Home from "components/Index";
import Home2 from "components/Index2";
import { metaInfo } from 'helpers/helper';
import { getCookie, setCookie } from 'cookies-next';

const Index = (props) => {

    const { event, loading } = useSelector(eventSelector);
    console.clear();
    console.log(event?.registration_site_theme_onepager,'theme settings');

    return (
        <>
            <MetaInfo metaInfo={props.metaInfo} cookie={props.cookie} />
            {event ? (
                <>
                <MasterLayoutRoute event={event}>
                    {event?.registration_site_theme_onepager === 0 && <Home />}
                    {event?.registration_site_theme_onepager === 1 && <Home2 />}
                </MasterLayoutRoute>
                    </>
            ) : (
                <PageLoader />
            )}
        </>
    )
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const eventData = await metaInfo(`${process.env.NEXT_APP_URL}/event/${context.query.event}/meta-info`, '');
    const serverCookie = getCookie(`cookie__${context.query.event}`, { req, res });
    if (serverCookie === null || serverCookie === undefined) {
        setCookie(`cookie__${context.query.event}`, 'necessary', { req, res, maxAge: 30 * 24 * 60 * 60, domain: '.eventbuizz.com' })
    }

    return {
        props: {
            metaInfo: eventData,
            cookie: (serverCookie !== null && serverCookie !== undefined) ? serverCookie : 'necessary',
            url: context.resolvedUrl,
        },
    }
}

export default Index