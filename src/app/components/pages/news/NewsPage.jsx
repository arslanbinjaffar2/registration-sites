import React, {useEffect} from 'react';
import News from '../../modules/news/News';
import {
    globalSelector,
    incrementLoadCount,
  } from "../../../../store/Slices/GlobalSlice";
  import { useDispatch, useSelector } from "react-redux";
  import PageLoader from "../../ui-components/PageLoader";
const NewsPage = () => {
  const dispatch = useDispatch();
  const { loadedSections, loadCount } = useSelector(globalSelector);
  useEffect(() => {
    dispatch(incrementLoadCount());
    
  }, []);
    return (
        <React.Fragment>
            <News pagination={true}/>
            {loadedSections !== loadCount && <PageLoader />}
        </React.Fragment>
    )
}

export default NewsPage
