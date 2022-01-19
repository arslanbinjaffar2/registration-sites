import React, { useState, useEffect, useMemo, Suspense } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { incrementLoadCount } from "store/Slices/GlobalSlice";
import { newsDetailSelector, fetchNewsDetail } from "store/Slices/NewsDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "@/ui-components/PageLoader";

import { withRouter } from "react-router";
const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/news/detail/${variation}`)
  );
  return Component;
};
const NewsDetail = (props) => {
  const id = props.match.params.id;
  const { event } = useSelector(eventSelector);
  const { news, loading, error } = useSelector(newsDetailSelector);
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
    dispatch(incrementLoadCount());
  }, []);

  return (
    <Suspense fallback={<div></div>}>
      {news ? (
        <React.Fragment>
          <Component  news={news} event={event} sidebar={sidebar} />
        </React.Fragment>
      ) : null}
    </Suspense>
  );
};

export default withRouter(NewsDetail);
