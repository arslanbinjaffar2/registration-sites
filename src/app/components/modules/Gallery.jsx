import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { fetchPhotos, photoSelector, clearState } from "store/Slices/PhotoSlice";
import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import PageLoader from "@/ui-components/PageLoader";
import LoadMoreButton from '@/ui-components/LoadMoreButton';

const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/gallery/${variation}`)
  );
  return Component;
};

const Gallery = (props) => {
  const initialMount = useRef(true);
  const { event } = useSelector(eventSelector);
  const { photos, totalPages, labels, loading } = useSelector(photoSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;

  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["gallery"]);
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
    dispatch(fetchPhotos(eventUrl, page, limit, home ));
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
      {photos ? (
        <div style={{ padding: "80px 0" }} >
          <Component settings={moduleVariation[0]} sitelabels={event.labels} photos={photos} home={home} eventUrl={eventUrl}
          loadMore={() => {
            if(page < totalPages){
              return <LoadMoreButton loadingLabel={event.labels.EVENTSITE_LOAD_MORE} page={page} loading={loading} onPageChange={(data)=> onPageChange(data)} />
            }
          }}
          />
        </div>
      ) : (!home ? <PageLoader/> : null )}
    </Suspense>
  );
};

export default withRouter(Gallery);
