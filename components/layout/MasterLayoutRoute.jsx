import React, {useEffect} from 'react';
import Header from "components/modules/Header";
import LoginScreen from 'components/myAccount/login/LoginScreen';
import PageLoader from '../ui-components/PageLoader';
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import {
    globalSelector
} from "store/Slices/GlobalSlice";
import Footer from "../modules/Footer";
import CookiePolicy from 'components/ui-components/CookiePolicy';

const MasterLayoutRoute = ({ children, event }) => {
    const router = useRouter();
    const { showLogin } = useSelector(globalSelector);
    
    if (event.eventsiteSettings.eventsite_public) {    
        const CorporateLogin = localStorage.getItem(`event${event.id}UserCorporateLogin`);
        if(!CorporateLogin){
            router.push(`/${event.url}/login`);
            return null;
        }
    }
    return (
        <>
            {event ?
                (<>
                    <Header />
                    {showLogin && <LoginScreen />}
                    {children}
                    <Footer /> 
                    <CookiePolicy/>
                </>) : (
                    <PageLoader/>
                )
            }
        </>
    )
}

export default MasterLayoutRoute