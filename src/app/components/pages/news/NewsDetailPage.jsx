import React from 'react'
import NewsDetail from '../../modules/news/NewsDetail';
import {
    globalSelector,
  } from "../../../../store/Slices/GlobalSlice";
  import { useSelector } from "react-redux";
  import PageLoader from "../../ui-components/PageLoader";
const NewsDetailPage = () => {
  const { loadedSections, loadCount } = useSelector(globalSelector);
    return (
        <React.Fragment>
            <NewsDetail/>
            {loadedSections !== loadCount && <PageLoader />}
        </React.Fragment>
    )
}

export default NewsDetailPage
