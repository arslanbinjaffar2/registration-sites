import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

const UiPagination = ({currentPage, onPageChange, fetchingData, total, perPage }) => {
    
      if(Math.ceil(total/perPage) <= 1){
            return(
              <React.Fragment>
              </React.Fragment>
      
            )
      }
      return (
       <Pagination>
             <Pagination.Item
                disabled={fetchingData} 
                onClick={()=>{onPageChange(currentPage - 1)}} >
                  Prev
            </Pagination.Item>
             <Pagination.Item 
                disabled={fetchingData} 
                onClick={()=>{onPageChange(currentPage +1)}} >
                  Next
            </Pagination.Item>
    </Pagination>
    )
}

export default UiPagination
