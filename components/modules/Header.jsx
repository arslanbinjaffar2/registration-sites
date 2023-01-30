import React, { Suspense, useMemo, useEffect, useState } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  globalSelector, setShowLogin, incrementFetchLoadCount
} from "store/Slices/GlobalSlice";
import { useRouter } from "next/router";

const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/header/${variation}`)
  );
  return Component;
};

const Header = ({ location, history }) => {

  const { event } = useSelector(eventSelector);

  const dispatch = useDispatch();

  const router = useRouter();

  const { fetchLoadCount } = useSelector(globalSelector);

  const [userExist, setUserExist] = useState(typeof window !== 'undefined' && localStorage.getItem(`event${event.id}User`) ? true : false);

  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["header"]);
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleRouteChange = (url) => {
        document.getElementsByTagName('body')[0].classList.remove('un-scroll');
        setUserExist(localStorage.getItem(`event${event.id}User`) ? true : false);
      }

      router.events.on('routeChangeStart', handleRouteChange)

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      return () => {
        router.events.off('routeChangeStart', handleRouteChange)
      }
    }
  }, [])

  useEffect(() => {
    dispatch(incrementFetchLoadCount());
  }, [location])


  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  const regisrationUrl = useMemo(()=>{
    let url = '';
    if(parseFloat(event.registration_form_id) === 1){
        url = (event.paymentSettings && parseInt(event.paymentSettings.evensite_additional_attendee) === 1) ? `${process.env.NEXT_APP_REGISTRATION_FLOW_URL}/${event.url}/attendee` : `${process.env.NEXT_APP_REGISTRATION_FLOW_URL}/${event.url}/attendee/manage-attendee`;
    }else{
      
      url = `${process.env.NEXT_APP_EVENTCENTER_URL}/event/${event.url}/detail/${event.eventsiteSettings.payment_type === 0 ? 'free/' : ''}registration`;
    }

    return url;
  },[event]);

  const top_menu =  useMemo(()=>{

    let menu = event.header_data.top_menu.map((item)=>{
       let rItem = {...item};
      if(!['practicalinformation', 'additional_information', 'general_information', 'info_pages'].includes(item.alias)){
        rItem['menu_url'] = `/${event.url}/${item.alias}`;
      }
      else if(item.alias == 'practicalinformation'){
        rItem['menu_url'] =  event.header_data["practical_info_menu"].length == 1 ? (event.header_data["practical_info_menu"][0].page_type === 1 ? `/${event.url}/${item.alias}/${event.header_data["practical_info_menu"][0].id}` : `${event.header_data["practical_info_menu"][0].website_protocol}${event.header_data["practical_info_menu"][0].url}`) : `/${event.url}/${item.alias}`;
        rItem['link_path'] = event.header_data["practical_info_menu"].length == 1 ? true : false;
      }
      else if(item.alias == 'additional_information'){
        rItem['menu_url'] =  event.header_data["additional_info_menu"].length == 1 ? (event.header_data["additional_info_menu"][0].page_type === 1 ? `/${event.url}/${item.alias}/${event.header_data["additional_info_menu"][0].id}` : `${event.header_data["additional_info_menu"][0].website_protocol}${event.header_data["additional_info_menu"][0].url}`) : `/${event.url}/${item.alias}`;
        rItem['link_path'] = event.header_data["additional_info_menu"].length == 1 ? true : false;
      }
      else if(item.alias == 'general_information'){
        rItem['menu_url'] =  event.header_data["general_info_menu"].length == 1 ? (event.header_data["general_info_menu"][0].page_type === 1 ? `/${event.url}/${item.alias}/${event.header_data["general_info_menu"][0].id}` : `${event.header_data["general_info_menu"][0].website_protocol}${event.header_data["general_info_menu"][0].url}`) : `/${event.url}/${item.alias}`;
        rItem['link_path'] = event.header_data["general_info_menu"].length == 1 ? true : false;
      }
      else if(item.alias == 'info_pages'){
        rItem['menu_url'] =  event.header_data["info_pages_menu"].length == 1 ? (event.header_data["info_pages_menu"][0].page_type === 1 ? `/${event.url}/${item.alias}/${event.header_data["info_pages_menu"][0].id}` : `${event.header_data["info_pages_menu"][0].website_protocol}${event.header_data["info_pages_menu"][0].url}`) : `/${event.url}/${item.alias}`;
        rItem['link_path'] = event.header_data["info_pages_menu"].length == 1 ? true : false;
      }
      return rItem;
    })
    return menu;
  },[event]);

  const onLoginClick = (bool) => {
    dispatch(setShowLogin(bool));
  }

  return (
    <Suspense fallback={''}>
      <Component event={event} regisrationUrl={regisrationUrl} loaded={fetchLoadCount} userExist={userExist} location={location} setShowLogin={onLoginClick} topMenu={top_menu} />
    </Suspense>
  );
};

export default Header;
