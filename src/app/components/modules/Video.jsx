import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { fetchVideos, videoSelector, clearState } from "store/Slices/VideoSlice";
import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import PageLoader from "@/ui-components/PageLoader";

const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/video/${variation}`)
  );
  return Component;
};

const Video = (props) => {
  const initialMount = useRef(true);
  const { event } = useSelector(eventSelector);
  const { videos, totalPages, labels } = useSelector(videoSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;

  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["video"]);
  });
  const home = props.homePage ? props.homePage : false;
  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  const limit = props.homePage
    ? 4
    : 50;
  
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchVideos(eventUrl, page, limit, home ));
    if(home){
      dispatch(incrementLoadCount());
    }
    return () => {
      dispatch(clearState());
    }
  }, [page, limit])

  const onPageChange = (page) => {
    if (page > 0) {
      if (page <= totalPages) {
        setPage(page);
      }
    }
  };

  return (
    <Suspense fallback={<PageLoader/>}>
      {videos ? (
        <div style={{ padding: "80px 0" }} >
          <Component settings={moduleVariation[0]} siteLabels={event.labels} videos={videos} home={home} eventUrl={eventUrl}
          loadMore={() => {
            return (
              <div className="container pb-5 p-0 pt-5 text-center">
                <button
                  className="edgtf-btn edgtf-btn-medium edgtf-btn-outline edgtf-btn-custom-hover-bg edgtf-btn-custom-border-hover edgtf-btn-custom-hover-color"
                  disabled={page > totalPages ? true : false}
                  onClick={(e) => onPageChange(page + 1)}
                >
                  Load More
                </button>
              </div>
            );
          }}
          />
        </div>
      ) : (!home ? <PageLoader/> : null )}
    </Suspense>
  );
};

export default withRouter(Video);
