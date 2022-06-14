import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { speakerSelector, fetchSpeakers } from "store/Slices/SpeakerSlice";
import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import PageLoader from "@/ui-components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/speaker/${variation}`)
  );
  return Component;
};

const Speaker = (props) => {
  const initialMount = useRef(true);
  const { event } = useSelector(eventSelector);
  const { speakers, totalPages, labels, loading } = useSelector(speakerSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;

  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["speaker"]);
  });

  const limit = props.homePage
    ? event.speaker_settings.registration_site_limit
    : 12;
  
  const home = props.homePage ? props.homePage : false;
  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(fetchSpeakers(eventUrl, page, limit, search, initialMount.current, home));
  }, [page, limit, search])



  useEffect(() => {
    if (initialMount.current) {
        dispatch(incrementLoadCount());
        initialMount.current = false;
        return;
    }
    const handler = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  const onPageChange = (page) => {
    if (page > 0) {
      if (page <= totalPages) {
        setPage(page);
      }
    }
  };

  return (
    <Suspense fallback={<PageLoader/>}>
      {speakers && ((speakers.length > 0 && home) || !home) ? (
        <React.Fragment>  
          <Component speakers={speakers} labels={labels} settings={moduleVariation[0]} listing={!home} history={props.history} event={event} searchBar={()=>{
            return (
            <div className="container pb-5">
              <div className="ebs-form-control-search"><input className="form-control" placeholder="Search..." type="text" onChange={(e) => setValue(e.target.value)} />
              {!loading ? <em className="fa fa-search"></em> : <div class="spinner-border"></div>}
              </div>
            </div>
            )
          }}
          loadMore={()=>{
            if(page < totalPages){
            return (
              <div className="container pb-5 p-0 pt-5 text-center">
                <button className="edgtf-btn edgtf-btn-medium edgtf-btn-outline edgtf-btn-custom-hover-bg edgtf-btn-custom-border-hover edgtf-btn-custom-hover-color" disabled={loading ? true : false} onClick={(e)=>onPageChange(page + 1)}>{event.labels.EVENTSITE_LOAD_MORE}
                    {loading && <div class="spinner-border"></div>} </button>
              </div>
            )
            }
          }}
          />
         
        </React.Fragment>
      ) : (!home ? <PageLoader/> : null ) }
    </Suspense>
  );
};

export default withRouter(Speaker);
