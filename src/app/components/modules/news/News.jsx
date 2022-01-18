import React, { Suspense, useEffect, useState, useMemo} from "react";
import { eventSelector } from "../../../../store/Slices/EventSlice";
import { incrementLoadedSection } from "../../../../store/Slices/GlobalSlice";
import { useGetNewsQuery } from "../../../../store/services/news";
import UiFullPagination from "../../ui-components/UiFullPagination";
import UiPagination from "../../ui-components/UiPagination";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/news/${variation}`)
  );
  return Component;
};

const News = (props) => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["news"]);
  });
  const showPagination = props.pagination ? props.pagination : false;

  const CustomComponent = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["slug"]),
    [event]
  );

  const [querySuccess, setQuerySuccess] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const queryPage = new URLSearchParams(props.location.search).get("page");
    if (queryPage && typeof parseInt(queryPage, 10) === "number") {
      setPage(parseInt(queryPage, 10));
      console.log("params", queryPage);
    }
  }, []);

  const { data, isFetching, isSuccess } = useGetNewsQuery({ eventUrl, page });

  useEffect(() => { 
    if (isSuccess) {
      if(!querySuccess){
        dispatch(incrementLoadedSection());
        setQuerySuccess(true);
      }
    }
  }, [isSuccess]);

  const onPageChange = (page) => {
    console.log(page);
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

  const makeNewDetailURL = (event_url,id) =>{
    return '/' +event_url + '/news-detail/' + id;
}

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {data ? (
        <React.Fragment>
          <div style={{paddingTop: 40}} className="edgtf-container">
            <div className="edgtf-container-inner">
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
            </div>
          </div>
         
          <CustomComponent news={data.data} event_url={eventUrl} makeNewDetailURL={makeNewDetailURL} />
          <div style={{paddingBottom: 40}} className="edgtf-container">
            <div className="edgtf-container-inner">
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
            </div>
          </div>

        </React.Fragment>
      ) : (
        <div>Loading...</div>
      )}
    </Suspense>
  );
};

export default withRouter(News);
