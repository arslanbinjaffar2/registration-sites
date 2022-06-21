import React from "react";
import News from "components/modules/news/News";
const NewsPage = () => {
  return (
    <React.Fragment>
      <News pagination={true} />
    </React.Fragment>
  );
};

export default NewsPage;
