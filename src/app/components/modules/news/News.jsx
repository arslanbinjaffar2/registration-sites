import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { incrementLoadCount } from "store/Slices/GlobalSlice";
import { newsSelector, fetchNews } from "store/Slices/NewsSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import PageLoader from "@/ui-components/PageLoader";

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
  const { news, totalPages, labels } = useSelector(newsSelector);
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
      dispatch(incrementLoadCount());
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

  return (
    <Suspense fallback={<PageLoader/>}>
      {news ? (
        <Component
          news={news}
          event_url={eventUrl}
          makeNewDetailURL={makeNewDetailURL}
          loadMore={() => {
            return (
              <div className="container pb-5 p-0 pt-5 text-center">
                <button
                  className={`edgtf-btn edgtf-btn-medium edgtf-btn-outline edgtf-btn-custom-hover-bg edgtf-btn-custom-border-hover edgtf-btn-custom-hover-color ${page >= totalPages ? 'disabled' : null}`}
                  disabled={page >= totalPages ? true : false}
                  onClick={(e) => onPageChange(page + 1)}
                >
                  Load More
                </button>
              </div>
            );
          }}
        />
      ) : <PageLoader/>}
    </Suspense>
  );
};

export default withRouter(News);
