import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { attendeeSelector, fetchAttendees } from "store/Slices/AttendeeSlice";
import {
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
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
  const { attendees, loading, error, totalPages } = useSelector(attendeeSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  let moduleVariation = event.theme.modules.filter(function (module, i) {
    return in_array(module.alias, ["attendee"]);
  });
  const limit = props.homePage
    ? event.speaker_settings.registration_site_limit
    : 10;
  const home = props.homePage ? props.homePage : false;
  const CustomComponent = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["slug"]),
    [event]
  );

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(fetchAttendees(eventUrl, page, limit, search, initialMount.current, home));
  }, [page, limit, search]);

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
    console.log(page);
    if (page > 0) {
      if (page <= totalPages) {
        setPage(page);
      }
    }
  };

 

  return (
    <Suspense fallback={<div></div>}>
      {attendees ? (
        <React.Fragment>
          <CustomComponent attendees={attendees} searchBar={()=>{
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
      ) : null}
    </Suspense>
  );
};

export default withRouter(Attendee);
