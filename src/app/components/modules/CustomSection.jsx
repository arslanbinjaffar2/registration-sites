import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { service } from "../../services/service";
import { eventSelector } from '../../../store/Slices/EventSlice'

const loadModule = (theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/custom-sections/${variation}`)
  );
  return Component;
}

const CustomSection = ({ pageId }) => {
  const { event } = useSelector(eventSelector)
  
  const Component = loadModule(event.theme.slug, "CustomSection");
  const [pageData, setPageData] = useState(null);
  
  useEffect(() => {
    loadPage(pageId);
  }, []);
  
  const loadPage = async (id) => {
    await service
      .get(`${process.env.REACT_APP_URL}/event/${event.url}/page/${id}`)
      .then((response) => {
        setPageData(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {pageData && <Component pageData={pageData} />}
    </Suspense>
  );
};


export default CustomSection;
