import React, { Suspense, useEffect, useState, useMemo } from "react";
import { eventSelector } from "../../../store/Slices/EventSlice";
import { useGetPhotosQuery } from "../../../store/services/photo";
import UiFullPagination from "../ui-components/UiFullPagination";
import UiPagination from "../ui-components/UiPagination";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/video/${variation}`)
  );
  return Component;
};

const Video = (props) => {
  const { event } = useSelector(eventSelector);
  const eventUrl = event.url;
  let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["video"]);
  });
  const showPagination = props.pagination ? props.pagination : false;

  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["slug"]),
    [event]
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    const queryPage = new URLSearchParams(props.location.search).get("page");
    if (queryPage && typeof parseInt(queryPage, 10) === "number" && showPagination) {
      setPage(parseInt(queryPage, 10));
      console.log("params", queryPage);
    }
  }, []);

  const { data, isFetching } = useGetPhotosQuery({ eventUrl, page,});

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
           <Component videos={data.data} /> 
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

export default withRouter(Video);
