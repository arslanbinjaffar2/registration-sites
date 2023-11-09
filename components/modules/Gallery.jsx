import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { fetchPhotos, photoSelector, clearState } from "store/Slices/PhotoSlice";
import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "components/ui-components/PageLoader";
import LoadMoreButton from 'components/ui-components/LoadMoreButton';
import Head from "next/head";
import PageHeader from "./PageHeader";
import { useRouter } from 'next/router';

const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`components/themes/${theme}/gallery/${variation}`)
  );
  return Component;
};

const Gallery = (props) => {
  const initialMount = useRef(true);
  const { event } = useSelector(eventSelector);
  const { photos, totalPages, labels, loading } = useSelector(photoSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  const router = useRouter();

  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["gallery"]);
  });
  const home = props.homePage ? props.homePage : false;
  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  const checkVariation = [
    'Variation1',
    'Variation2',
    'Variation4',
    'Variation7',
    'Variation8',
  ];
  const limit = props.homePage
    ? (in_array(moduleVariation[0]["variation_slug"], checkVariation) ? 8 : 6 )
    : 50;
  
  const [page, setPage] = useState(1);

  const checkModuleStatus = useMemo(()=>(event?.header_data?.gallery_sub_menu.findIndex((item)=>(item.alias === 'photos'))),[event]);

  const checkModuleHomeStatus = useMemo(()=>(event?.layoutSections?.findIndex((item)=>(item.module_alias === 'gallery' && item.status == 1))),[event]);

  useEffect(() => {
    if(checkModuleStatus < 0 && checkModuleHomeStatus < 0){
      router.push(`/${eventUrl}`);
    }
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
      {(home && photos && photos.length > 0 ) || (!home && photos) ? (
        <React.Fragment>
          {!home && <Head>
              <title>{event.eventsiteModules.gallery}</title>
          </Head>}

          {!home && <PageHeader label={event.labels.EVENTSITE_PHOTOS} desc={event.labels.EVENTSITE_PHOTOS_SUB} />}
          <div className="">
            <Component settings={moduleVariation[0]} sitelabels={event.labels} photos={photos} totalPages={totalPages} home={home} eventUrl={eventUrl}
            loadMore={() => {
              if(page < totalPages){
                return <LoadMoreButton loadingLabel={event.labels.GENERAL_LOAD_MORE} page={page} loading={loading} onPageChange={(data)=> onPageChange(data)} />
              }
            }}
            />
          </div>
        </React.Fragment>
      ) : (!home ? <PageLoader/> : null )}
    </Suspense>
  );
};

export default Gallery;
