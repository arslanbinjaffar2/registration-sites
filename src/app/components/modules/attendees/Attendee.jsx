import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { attendeeSelector, fetchAttendees } from "store/Slices/AttendeeSlice";
import { incrementLoadCount } from "store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import PageLoader from "@/ui-components/PageLoader";
import LoadMoreButton from "@/ui-components/LoadMoreButton";
import SearchBar from "@/ui-components/SearchBar";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/attendee/${variation}`)
  );
  return Component;
};

const Attendee = (props) => {
  const initialMount = useRef(true);
  const { event } = useSelector(eventSelector);
  const { attendees, labels, loading, totalPages } =
    useSelector(attendeeSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["attendee"]);
  });
  const limit = 12;
  const CustomComponent = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(
      fetchAttendees(eventUrl, page, limit, search, initialMount.current)
    );
  }, [page, limit, search]);

  useEffect(() => {
    if (initialMount.current) {
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
    console.log(page);
    if (page > 0) {
      if (page <= totalPages) {
        setPage(page);
      }
    }
  };

  return (
    <Suspense fallback={<PageLoader/>}>
      {attendees ? (
        <React.Fragment>
          <CustomComponent
          labels={labels}
            attendees={attendees}
            settings={moduleVariation[0]}
            event={event}
            searchBar={() => {
              return <SearchBar searchLabel={event.labels.EVENTSITE_GENERAL_SEARCH} loading={loading} setValue={(text)=>setValue(text)}  />;
            }}
            loadMore={() => {
                if(page < totalPages){
                  return <LoadMoreButton loadingLabel={event.labels.EVENTSITE_LOAD_MORE} page={page} loading={loading} onPageChange={(data)=> onPageChange(data)} />
                }
            }}
          />
        </React.Fragment>
      ) : <PageLoader/>}
    </Suspense>
  );
};

export default withRouter(Attendee);
