import React, { useState, useEffect, useMemo, Suspense } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { newsDetailSelector, fetchNewsDetail, clearState } from "store/Slices/NewsDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "components/ui-components/PageLoader";
import { useRouter } from 'next/router';

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/news/detail/${variation}`)
  );
  return Component;
};

const NewsDetail = (props) => {

  const router = useRouter();

  const { id } = router.query;

  const { event } = useSelector(eventSelector);

  const { news, labels } = useSelector(newsDetailSelector);

  const dispatch = useDispatch();

  const eventUrl = event.url;

  const Component = useMemo(
    () => loadModule(event.theme.slug, "Variation1"),
    [event]
  ); 

  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    dispatch(fetchNewsDetail(eventUrl, id));
    return () => {
      dispatch(clearState());
    }
  }, []);

  return (
    <Suspense fallback={<PageLoader/>}>
      {news ? (
        <React.Fragment>
          <Component  news={news} event={event} sidebar={sidebar} newsSettings={event.news_settings} />
        </React.Fragment>
      ) : <PageLoader/>}
    </Suspense>
  );
};

export default NewsDetail;
