import React, { Suspense, useEffect, useState, useMemo } from "react";
import { eventSelector } from '../../../store/Slices/EventSlice'
import { useGetAttendeesQuery } from '../../../store/services/attendee'
import UiPagination from '../ui-components/UiPagination'
import {  useSelector } from 'react-redux'
const in_array = require("in_array");
const loadModule =(theme, variation) => {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/attendee/${variation}`)
  );
  return Component;
}
const Attendee = (props) => {
  const { event } = useSelector(eventSelector)
  
  const eventUrl = event.url;
  let moduleVariation = event.theme.modules.filter(function (module, i) {
  return in_array(module.alias, ["attendee"]);
  });

  const showPagination = props.pagination ? props.pagination : false;
  const CustomComponent =useMemo(() => loadModule(event.theme.slug, moduleVariation[0]['slug']), [event]) ;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  const { data, isFetching  } = useGetAttendeesQuery({eventUrl, page, search})
  
  const onPageChange = (page) =>{
    console.log(page);
    if(page > 0){
      if(page <= Math.ceil(data.meta.total / data.meta.per_page)){
        setPage(page);
        }
      }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {showPagination &&  <input type="text" onChange={(e)=> setValue(e.target.value) } /> }
      { data && <CustomComponent attendees={data.data} />}
        {showPagination && data && 
          <UiPagination 
            total={data.meta.total} 
            perPage={data.meta.per_page} 
            currentPage={page} 
            onPageChange={(page) => {onPageChange(page)}}
            pageRange={5}
            fetchingData={isFetching}
          />   
        }
    </Suspense>
  );
};

export default Attendee;
