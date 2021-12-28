import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

const UiPagination = ({ total, perPage, currentPage, onPageChange, pageRange, fetchingData }) => {
  const [pageArray, setPageArray] = React.useState([]);

  const totalPages = Math.ceil(total / perPage);

  React.useEffect(() => {
    var pageArr = [];
    if (totalPages > 1) {
      var range = pageRange ? pageRange : 9; 
      if (totalPages <= range) {
        var i = 1;
        while (i <= totalPages) {
          pageArr.push(i);
          i++;
        }
      } 
      else{
        var j = currentPage;
        while (j <= range) {
          pageArr.push(i);
          j++;
        }
      }
    }
    setPageArray(pageArr);
  }, []);

    return (
        <Pagination>
         <Pagination.Prev onClick={()=>{onPageChange(currentPage - 1)}} />
            {
              pageArray.map((link, index)=>{
                return <Pagination.Item key={index} disabled={fetchingData} active={link === currentPage ? true : false}  onClick={()=>{onPageChange(link)}} >
                  {link}</Pagination.Item>
                })
            } 
        <Pagination.Next  onClick={()=>{onPageChange(currentPage + 1)}} />   
    </Pagination>
    )
}

export default UiPagination
