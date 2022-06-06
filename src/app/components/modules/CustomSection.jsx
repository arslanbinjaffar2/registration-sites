import React, { Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetCmsPagesQuery } from "../../../store/services/cmspage";
import { eventSelector } from '../../../store/Slices/EventSlice'
import PageLoader from "@/ui-components/PageLoader";

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/custom-sections/${variation}`)
  );
  return Component;
}

const CustomSection = ({ pageId }) => {
  const { event } = useSelector(eventSelector)
  const eventUrl = event.url;
  const Component = useMemo(() =>  loadModule(event.theme.slug, "CustomSection"), [event])
  const { data } = useGetCmsPagesQuery({ eventUrl, pageId});
 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {data && <Component data={data} />}
    </Suspense>
  );
};


export default CustomSection;



