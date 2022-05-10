import React, { useState, useEffect } from "react";
import {
  fetchKeywordsData,
  interestSelector,
  updateKeywordData,
} from "store/Slices/myAccount/networkInterestSlice";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
const ManageKeywords = () => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchKeywordsData(event.url));
  }, []);
  const { keywords } = useSelector(interestSelector);
  return (
    <div className="edgtf-container ebs-my-profile-area pb-5">
      <div className="edgtf-container-inner">
        <div className="ebs-header">
          <h2>My Keywords</h2>
        </div>
        <div className="wrapper-inner-content network-category-sec">
          {keywords && <ManageKeywordsList keywords={keywords} eventUrl={event.url} />}
        </div>
      </div>
    </div>
  );
};

export default ManageKeywords;

const ManageKeywordsList = ({ keywords, eventUrl }) => {
  const [interestkeywords, setInterestKeywords] = useState(keywords);
  const [mykeywords, setMyKeywords] = useState(keywords.reduce((ack, item)=>{
    const childern = item.children.reduce((ack2, item2)=>{
      if(item2.keywords.length > 0){
          return [item2.id, ...ack2]
      }else{
        return ack2
      }
    },[]);
    if(item.keywords.length > 0 ){
      return [item.id, ...childern, ...ack];
    }else{
      return [...ack, ...childern];
    }
  },[]));
  const [filteredkeywords, setFilteredKeywords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();

  const setFilter= (kid)=>{
    setSearchTerm("");
    if(kid !== 0){
      if(filters.indexOf(kid) === -1) {
        setFilters([...filters, kid])
      }else{
        setFilters([...filters.filter((item)=>( item !== kid))])
      }
    }else{
      setFilters([]);
    }
  }
  const setSearch = (e)=>{
    const {value} = e.target;
    setSearchTerm(value);
    setFilters([ ...interestkeywords.filter((kword)=> (kword.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)).map((kword)=>(kword.id)) ])
  }
  useEffect(() => {
    if(filters.length > 0)
    {
      setFilteredKeywords([...interestkeywords.filter((kword)=> (filters.indexOf(kword.id) !== -1) )])
    }
    else{
      setFilteredKeywords([])
    }
  }, [filters])
  
  const addMyKeyword = (kid) =>{
    if(mykeywords.indexOf(kid) === -1) {
      setMyKeywords([...mykeywords, kid])
    }else{
      setMyKeywords([...mykeywords.filter((item)=>( item !== kid))])
    }
  }
  const handleSave = (e) =>{
    dispatch(updateKeywordData(eventUrl, mykeywords));
  }
  return (
    <React.Fragment>
      <div className="ebs-keyword-search">
        <label>
          <input placeholder="Search" type="text" value={searchTerm} onChange={(e)=>{ setSearch(e) }} />
          <i className="material-icons">search</i>
        </label>
      </div>
      <div className="ebs-keywords-filter">
        <div className="network-cateogry-list ebs-cateogry-filter">
          <ul>
            <li>
              <label>
                <input type="checkbox" onChange={()=>{setFilter(0)}} />
                <span>All</span>
              </label>
            </li>
            {interestkeywords.map((kword)=>(<li key={kword.id}>
              <label>
                <input type="checkbox" checked={filters.indexOf(kword.id) !== -1 ? true : false} onChange={()=>{setFilter(kword.id)}} />
                <span>{kword.name}</span>
              </label>
            </li>))}
          </ul>
        </div>
      </div>
      {filteredkeywords.length > 0 ? filteredkeywords.map((item) => (
      <div className="network-cateogry-list" key={item.id}>
        <h5>{item.name}</h5>
        <ul>
          {item.children.map((child) => (
            <li key={child.id}>
              <label>
                <input type="checkbox" checked={mykeywords.indexOf(child.id) !== -1 ? true : false} />
                <span>{child.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      )):
      interestkeywords.map((item) => (
        <div className="network-cateogry-list" key={item.id}>
          <h5>{item.name}</h5>
          <ul>
            {item.children.map((child) => (
              <li key={child.id}>
                <label>
                  <input type="checkbox" checked={mykeywords.indexOf(child.id) !== -1 ? true : false} onChange={()=>{addMyKeyword(child.id)}} />
                  <span>{child.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        ))}
      <button className="btn btn-primary btn-loader" onClick={(e)=>{handleSave(e)}}> Save </button>
    </React.Fragment>
  );
};
