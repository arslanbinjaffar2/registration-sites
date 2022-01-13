import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "../../../store/Slices/EventSlice";
import {
  incrementLoadCount,
  incrementLoadedSection,
} from "../../../store/Slices/GlobalSlice";
import { useGetSpeakersQuery } from "../../../store/services/speaker";
import UiFullPagination from "../ui-components/UiFullPagination";
import UiPagination from "../ui-components/UiPagination";
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
  const showPagination = props.pagination ? props.pagination : false;
  const limit = props.homePage
    ? event.speaker_settings.registration_site_limit
    : 10;
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
    const queryPage = new URLSearchParams(props.location.search).get("page");
    if (queryPage && typeof parseInt(queryPage, 10) === "number") {
      setPage(parseInt(queryPage, 10));
      console.log("params", queryPage);
    }
  }, []);

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
        setQueryParams(page);
      }
    }
  };

  const setQueryParams = (page) => {
    props.history.replace({
      search: `?page=${page}`,
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {data ? (
        <React.Fragment>
          {/* {showPagination && (
            <UiPagination
              total={data.meta.total}
              perPage={data.meta.per_page}
              currentPage={page}
              onPageChange={(page) => {
                onPageChange(page);
              }}
              fetchingData={isFetching}
            />
          )} */}
<<<<<<< HEAD
          <Component
            speakers={data.data}
            listing={!home}
            searchBar={() => {
              return (
                <div className="container pt-5 pb-5">
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              );
            }}
          />
=======
          <Component speakers={data.data} listing={!home} searchBar={()=>{
            return (
              <div className="container pb-5">
              <div className="ebs-form-control-search"><input className="form-control" placeholder="Search..." type="text" onChange={(e) => setValue(e.target.value)} />
              <em className="fa fa-search"></em>
              </div>
            </div>
            )
          }} />
>>>>>>> b6a53ef80e5b89af3a99ea26d9627dcf5fa4e517
          {/* {showPagination && (
            <UiFullPagination
              total={data.meta.total}
              perPage={data.meta.per_page}
              currentPage={page}
              onPageChange={(page) => {
                onPageChange(page);
              }}
              fetchingData={isFetching}
            />
          )} */}
        </React.Fragment>
      ) : (
        <div>Loading...</div>
      )}
    </Suspense>
  );
};

export default withRouter(Speaker);
