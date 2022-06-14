import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "@/ui-components/PageLoader";

import {
  incrementLoadedSection,
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import { useGetProgramsQuery } from "store/services/program";
import UiFullPagination from "../../ui-components/UiFullPagination";
import UiPagination from "../../ui-components/UiPagination";
import { useSelector, useDispatch } from "react-redux";
// import { programSelector, fetchPrograms } from "store/Slices/ProgramSlice";

import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/program/Variation1`)
  );
  return Component;
};

const Program = (props) => {
  const initialMount = useRef(true);
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  // let moduleVariation = event.moduleVariations.filter(function (module, i) {
  //   return in_array(module.alias, ["agenda"]);
  // });
  // const home = props.homePage ? props.homePage : false;
  const Component = useMemo(
    () => loadModule(event.theme.slug, ),
    [event]
  );
  // const { programs, totalPages, labels } = useSelector(programSelector);

  // const [page, setPage] = useState(1);
  // const [search, setSearch] = useState("");
  // const [value, setValue] = useState("");

  // useEffect(() => {
  //   dispatch(fetchPrograms(eventUrl, page, search, initialMount.current, home));
  // }, [page, search])


  // useEffect(() => {
  //   if (initialMount.current) {
  //     dispatch(incrementLoadCount());
  //     initialMount.current = false;
  //     return;
  //   }
  //   const handler = setTimeout(() => {
  //     setSearch(value);
  //     setPage(1);
  //   }, 500);

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [value]);

 

  // useEffect(() => {
  //   if (initialMount.current) {
  //       dispatch(incrementLoadCount());
  //       initialMount.current = false;
  //       return;
  //   }
  //   const handler = setTimeout(() => {
  //     setSearch(value);
  //     setPage(1);
  //   }, 500);

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [value]);

  // const onPageChange = (page) => {
  //   if (page > 0) {
  //     if (page <= totalPages) {
  //       setPage(page);
  //     }
  //   }
  // };


  return (
    <Suspense fallback={<div></div>}>
      {/* {programs && programs.length > 0 ? (
        <React.Fragment>
          {!home && (
            <input type="text" onChange={(e) => setValue(e.target.value)} />
          )} */}
          <Component />
        {/* </React.Fragment>
      ) :  home ? null : (
        <div>No Programs found</div>
      )} */}
    </Suspense>
  );
};

export default withRouter(Program);
