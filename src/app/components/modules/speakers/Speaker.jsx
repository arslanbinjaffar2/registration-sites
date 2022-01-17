import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { speakerSelector, fetchSpeakers } from "store/Slices/SpeakerSlice";
import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
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
  const { speakers, loading, error, totalPages,  } = useSelector(speakerSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;

  let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["speaker"]);
  });

  const limit = props.homePage
    ? event.speaker_settings.registration_site_limit
    : 10;
  
  const home = props.homePage ? props.homePage : false;
  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["slug"]),
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
    <Suspense fallback={<div></div>}>
      {speakers && ((speakers.length > 0 && home) || !home) ? (
        <React.Fragment>  
          <Component speakers={speakers} listing={!home} history={props.history} event={event} searchBar={()=>{
            return (
            <div className="container pb-5">
              <div className="ebs-form-control-search"><input className="form-control" placeholder="Search..." type="text" onChange={(e) => setValue(e.target.value)} />
              <em className="fa fa-search"></em>
              </div>
            </div>
            )
          }}
          loadMore={()=>{
            return (
              <div className="container pb-5">
                <button disabled={page > totalPages ? true : false}  onClick={(e)=>onPageChange(page + 1)}>Load More</button>
              </div>
            )
          }}
          />
         
        </React.Fragment>
      ) :  null }
    </Suspense>
  );
};

export default withRouter(Speaker);
