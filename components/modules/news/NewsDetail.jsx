import React, { useState, useEffect, useMemo, Suspense } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { newsDetailSelector, fetchNewsDetail, clearState } from "store/Slices/NewsDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "components/ui-components/PageLoader";

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/news/detail/${variation}`)
  );
  return Component;
};
const NewsDetail = (props) => {
  const id = props.match.params.id;
  const { event } = useSelector(eventSelector);
  const { news, labels } = useSelector(newsDetailSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
   // let moduleVariation = event.theme.modules.filter(function (module, i) {
  //   return in_array(module.alias, ["news_detail"]);
  // });

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
