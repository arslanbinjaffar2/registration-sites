import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { newsSelector, fetchNews } from "store/Slices/NewsSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import PageLoader from "@/ui-components/PageLoader";
import LoadMoreButton from '@/ui-components/LoadMoreButton';

const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/news/${variation}`)
  );
  return Component;
};

const News = (props) => {
  const initialMount = useRef(true);
  const { event } = useSelector(eventSelector);
  const { news, totalPages, labels, loading } = useSelector(newsSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["news"]);
  });
  const limit = 10;
  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchNews(eventUrl, page, limit, initialMount.current));
  }, [page, limit]);

  useEffect(() => {
    if (initialMount.current) {
      console.log(initialMount.current);
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
    return "/" + event_url + "/news-detail/" + id;
  };
  console.log(event.news_settings)
  return (
    <Suspense fallback={<PageLoader/>}>
      {news ? (
        <Component
          news={news}
          event_url={eventUrl}
          newsSettings={event.news_settings}
          makeNewDetailURL={makeNewDetailURL}
          loadMore={() => {
            if(page < totalPages){
              return <LoadMoreButton loadingLabel={event.labels.EVENTSITE_LOAD_MORE} page={page} loading={loading} onPageChange={(data)=> onPageChange(data)}  />
            }
          }}
        />
      ) : <PageLoader/>}
    </Suspense>
  );
};

export default withRouter(News);
