import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "../../../store/Slices/EventSlice";
import { useGetExhibitorsQuery } from "../../../store/services/exhibitor";
import UiFullPagination from "../ui-components/UiFullPagination";
import UiPagination from "../ui-components/UiPagination";
import {
  incrementLoadedSection,
  incrementLoadCount,
} from "../../../store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/exhibitor/${variation}`)
  );
  return Component;
};

const Exhibitor = (props) => {
  const initialMount = useRef(true);
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["exhibitors"]);
  });
  const showPagination = props.pagination ? props.pagination : false;

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["slug"]),
    [event]
  );

  const [querySuccess, setQuerySuccess] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const queryPage = new URLSearchParams(props.location.search).get("page");
  useEffect(() => {
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

  const { data, isFetching, isSuccess } = useGetExhibitorsQuery({
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
      {data ? (
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
          <Component exhibitors={data.data} />
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
      ) : (
        <div>Loading...</div>
      )}
    </Suspense>
  );
};

export default withRouter(Exhibitor);
