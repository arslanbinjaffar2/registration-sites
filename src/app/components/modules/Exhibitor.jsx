import React, { Suspense, useEffect, useMemo,} from "react";
import { eventSelector } from "store/Slices/EventSlice"
import {
  incrementLoadedSection,
  incrementLoadCount,
} from "store/Slices/GlobalSlice";
import { useSelector, useDispatch } from "react-redux";
import { exhibitorSelector, fetchExhibitors } from "store/Slices/ExhibitorSlice";

import { withRouter } from "react-router";
const in_array = require("in_array");

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/exhibitor/${variation}`)
  );
  return Component;
};

const Exhibitor = (props) => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  const eventUrl = event.url;
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["exhibitor"]);
  });
  const Component = useMemo(
    () => loadModule(event.theme.slug, moduleVariation[0]["variation_slug"]),
    [event]
  );

  useEffect(() => {
    dispatch(incrementLoadCount());
    dispatch(fetchExhibitors(eventUrl));
  }, []);

  const { exhibitorsByCategories, loading, error} = useSelector(exhibitorSelector);
  return (
    <Suspense fallback={<div></div>}>
      {exhibitorsByCategories && exhibitorsByCategories.length > 0 ? (
        <React.Fragment>
          <Component exhibitorsByCategories={exhibitorsByCategories} />
        </React.Fragment>
      ) :  null }
    </Suspense>
  );
};

export default withRouter(Exhibitor);
