import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent, eventSelector } from "../store/Slices/EventSlice";
import { globalSelector } from "../store/Slices/GlobalSlice";
import "sass/app.scss";
import { ltrim } from "helpers";
import RouterOutlet from "router/RouterOutlet";
import PageLoader from "./components/ui-components/PageLoader";
const App = () => {
  let path = ltrim(window.location.pathname, "/");
  let params = path.split("/");
  const dispatch = useDispatch();
  const { event, loading, error } = useSelector(eventSelector);
  useEffect(() => {
    dispatch(fetchEvent(params.length > 0 ? params[0] : ""));
  }, [dispatch]);

  if (error && loading) {
    return (
      <div id="App">
        <h3>Could not Fetch the Event...</h3>
      </div>
    );
  }
  return (
    <div id="App" style={{postion:'relative'}}>
      {loading && <PageLoader className="fixed" />}
      {!loading && event && <RouterOutlet />}
    </div>
  );
};

export default App;
