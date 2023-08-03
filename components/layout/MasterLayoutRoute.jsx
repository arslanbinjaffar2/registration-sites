import React, { useEffect, useState } from 'react';
import Header from "components/modules/Header";
import LoginScreen from 'components/myAccount/login/LoginScreen';
import PageLoader from '../ui-components/PageLoader';
import { useSelector } from "react-redux";
import { useRouter, Router } from 'next/router';

import { globalSelector } from "store/Slices/GlobalSlice";
import Footer from "../modules/Footer";
import CookiePolicy from 'components/ui-components/CookiePolicy';

const MasterLayoutRoute = ({ children, event }) => {
    const router = useRouter();
    const [modulehas, setmodulehas] = useState(false);
    const { showLogin } = useSelector(globalSelector);
    if (event.eventsiteSettings.eventsite_public) {
        const CorporateLogin = localStorage.getItem(`event${event.id}UserCorporateLogin`);
        if (!CorporateLogin) {
            router.push(`/${event.url}/login`);
            return null;
        }
    }

    const segs = router.asPath.split('/');
    const lastSegment = segs.filter((segment) => segment !== '').pop();
    if (lastSegment == 'documents'){
        event.header_data.top_menu.map((item) => {
            if (item.alias != 'documents'){
                router.push(`/${event.url}`)
            }
        });
    }
    return (
        <>

            {event ? (
                <>
                    <Header />
                    {showLogin && <LoginScreen />}
                    {children}
                    <Footer />
                    <CookiePolicy/>
                </>
            ) : (
                <PageLoader />
            )}

        </>
    )
}

export default MasterLayoutRoute