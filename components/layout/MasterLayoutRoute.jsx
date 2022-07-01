import React, {useEffect} from 'react';
import Header from "components/modules/Header";
import LoginScreen from 'components/myAccount/login/LoginScreen';
import PageLoader from '../ui-components/PageLoader';
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import {
    globalSelector
} from "store/Slices/GlobalSlice";


const MasterLayoutRoute = ({ children, event }) => {
    if (event.eventsiteSettings.eventsite_public) {    
        const CorporateLogin = localStorage.getItem(`event${event.id}UserCorporateLogin`);
        const router = useRouter();
        if(!CorporateLogin){
            router.push(`/${event.url}/login`);
            return null;
        }
    }
    const { showLogin } = useSelector(globalSelector);
    return (
        <>
            {event ?
                (<>
                    <Header />
                    {showLogin && <LoginScreen />}
                    {children}
                </>) : (
                    <PageLoader/>
                )
            }
        </>
    )
}

export default MasterLayoutRoute