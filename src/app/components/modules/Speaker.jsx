import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "../../../store/Slices/EventSlice";
import {
  incrementLoadCount,
  incrementLoadedSection,
} from "../../../store/Slices/GlobalSlice";
import { useGetSpeakersQuery } from "../../../store/services/speaker";
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
  const dispatch = useDispatch();
  const eventUrl = event.url;

  let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["speaker"]);
  });

  const limit = props.homePage
    ? event.speaker_settings.registration_site_limit
    : 2;
  
  const home = props.homePage ? props.homePage : false;
  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["slug"]),
    [event]
  );

  const [querySuccess, setQuerySuccess] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");

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

  const { data, isFetching, isSuccess } = useGetSpeakersQuery({
    eventUrl,
    page,
    search,
    home,
    limit,
  });

  useEffect(() => {
    if (isSuccess) {
      if (!querySuccess) {
        dispatch(incrementLoadedSection());
        setQuerySuccess(true);
      }
    }
  }, [isSuccess]);

  const onPageChange = (page) => {
    if (page > 0) {
      if (page <= Math.ceil(data.meta.total / data.meta.per_page)) {
        setPage(page);
      }
    }
  };

  return (
    <Suspense fallback={<div></div>}>
      {data && data.data.length > 0 ? (
        <React.Fragment>  
          <Component speakers={data.data} listing={!home} searchBar={()=>{
            return (
            <div className="container pb-5">
              <div className="ebs-form-control-search"><input className="form-control" placeholder="Search..." type="text" onChange={(e) => setValue(e.target.value)} />
              <em className="fa fa-search"></em>
              </div>
            </div>
            )
          }}
          // loadMore={()=>{
          //   return (
          //     <div className="container pb-5">
          //       <button  onClick={(e)=>onPageChange(page + 1)}>Load More</button>
          //     </div>
          //   )
          // }}
          />
         
        </React.Fragment>
      ) :  home ? null : (
        <div>No Speaker found</div>
      )}
    </Suspense>
  );
};

export default withRouter(Speaker);
