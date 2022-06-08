import React from "react";
import News from "@/modules/news/News";
import { globalSelector } from "store/Slices/GlobalSlice";
import { useSelector } from "react-redux";
import PageLoader from "@/ui-components/PageLoader";
const NewsPage = () => {
  const { loadedSections, loadCount } = useSelector(globalSelector);
  return (
    <React.Fragment>
      <News pagination={true} />
    </React.Fragment>
  );
};

export default NewsPage;
