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
    const isFound = event.header_data.top_menu.some(item => {
        if (item.alias == "documents") {
            return true;
        }

        return false;
    });

    if (lastSegment == 'documents' && !isFound) {
        router.push(`/${event.url}`)
    }
    console.log(event.theme.slug);
    return (
        <>

            {event ? (
                <>
                    <Header />
                    {showLogin && <LoginScreen />}
                    {event.theme.slug === 'theme-1' && {children}}
                    {event.theme.slug === 'theme-2' && <div className='ebs-master-theme-v2'>{children}</div>}
                    {event.theme.slug === 'theme-1' && <Footer />}
                    <CookiePolicy/>
                </>
            ) : (
                <PageLoader />
            )}

        </>
    )
}

export default MasterLayoutRoute