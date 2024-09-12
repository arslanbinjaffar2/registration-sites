import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { newsSelector, fetchNews } from "store/Slices/NewsSlice";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "components/ui-components/PageLoader";
import LoadMoreButton from 'components/ui-components/LoadMoreButton';
import Head from "next/head";
import PageHeader from "../PageHeader";
import { useRouter } from 'next/router';
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/news/${variation}`)
  );
  return Component;
};

const News = (props) => {

  const initialMount = useRef(true);

  const { event } = useSelector(eventSelector);

  const { news, totalPages, labels, loading } = useSelector(newsSelector);

  const dispatch = useDispatch();

  const eventUrl = event.url;
  const router = useRouter();


  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["news"]);
  });

  const limit = props.homePage ? "default_setting" : 10;

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  const [page, setPage] = useState(1);

  const checkModuleStatus = useMemo(()=>(event?.header_data?.top_menu.findIndex((item)=>(item.alias === 'news'))),[event]);
  
  const checkModuleHomeStatus = useMemo(()=>(event?.layoutSections?.findIndex((item)=>(item.module_alias === 'news' && item.status == 1))),[event]);


  useEffect(() => {
    if(checkModuleStatus < 0 && checkModuleHomeStatus < 0){
      router.push(`/${eventUrl}`);
    }
    dispatch(fetchNews(eventUrl, page, limit, initialMount.current));
  }, [page, limit]);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
  }, []);

  const onPageChange = (page) => {
    if (page > 0) {
      if (page <= totalPages) {
        setPage(page);
      }
    }
  };

  const makeNewDetailURL = (event_url, id) => {
    return "/" + event_url + "/news/" + id;
  };

  return (
    <Suspense fallback={<PageLoader />}>
      {news ? (
        <React.Fragment>
        {!props.homePage && <Head><title>{event.eventsiteModules.news}</title></Head>}
        {!props.homePage ? <PageHeader label={event.eventsiteModules.news}/> : null}
        {news.length > 0 ? <Component
          news={news}
          event_url={eventUrl}
          siteLabels={event.labels}
          newsSettings={event.news_settings}
          // newsSubscriberSetting={event.news_subscriber_setting}
          makeNewDetailURL={makeNewDetailURL}
          homePage={props.homePage ? true : false}
          moduleVariation={moduleVariation[0]}
          loadMore={() => {
            if (page < totalPages) {
              return <LoadMoreButton loadingLabel={event.labels.EVENTSITE_LOAD_MORE} page={page} loading={loading} onPageChange={(data) => onPageChange(data)} />
            }
          }}
        /> : null}
        </React.Fragment>
      ) : !props.homePage ? <PageLoader /> : null}
    </Suspense>
  );
};

export default News;
