import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "../../../store/Slices/EventSlice";
import { useGetSponsorsQuery } from "../../../store/services/sponsor";
import {
  incrementLoadedSection,
  incrementLoadCount,
} from "../../../store/Slices/GlobalSlice";
import UiFullPagination from "../ui-components/UiFullPagination";
import UiPagination from "../ui-components/UiPagination";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/sponsor/${variation}`)
  );
  return Component;
};

const Sponsor = (props) => {
  const initialMount = useRef(true);
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["sponsor"]);
  });
  const showPagination = props.pagination ? props.pagination : false;
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

  const { data, isFetching, isSuccess } = useGetSponsorsQuery({
    eventUrl,
    page,
    search,
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
      {data && data.data.length > 0 ? (
        <React.Fragment>
          {showPagination && (
            <input type="text" onChange={(e) => setValue(e.target.value)} />
          )}
          {showPagination && (
            <UiPagination
              total={data.meta.total}
              perPage={data.meta.per_page}
              currentPage={page}
              onPageChange={(page) => {
                onPageChange(page);
              }}
              fetchingData={isFetching}
            />
          )}
          <Component sponsors={data.data} />
          {showPagination && (
            <UiFullPagination
              total={data.meta.total}
              perPage={data.meta.per_page}
              currentPage={page}
              onPageChange={(page) => {
                onPageChange(page);
              }}
              fetchingData={isFetching}
            />
          )}
        </React.Fragment>
      ) :  home ? null : (
        <div>No Sponsors found</div>
      )}
    </Suspense>
  );
};

export default withRouter(Sponsor);
