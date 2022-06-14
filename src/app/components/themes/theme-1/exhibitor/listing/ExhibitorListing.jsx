import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

const ExhibitorListing = ({exhibitors, exhibitorCategories, labels, eventUrl, siteLabels}) => {
  const [locExhibitors, setLocExhibitors] = useState(exhibitors);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [filterAlphabet, setFilterAlphabet ] = useState('all');
  const element = useRef();

  const search = (text) => {
    setFilterAlphabet('all');
    setSearchText(text);
  }

  const filterbyAlphabet = (alphabet) => {
    setSearchText('');
    setFilterAlphabet(alphabet);
  }

  const filterbyCategory  = (category) =>{
      setSelectedCategory(category);
  }

  useEffect(() => {
    let items = exhibitors;
    if(selectedCategory !== 'all')
    items =[...items.filter((exhibitor)=> (
      exhibitor.categories.filter((cat)=>( cat.id === selectedCategory)).length > 0
      ))];
    
    if(filterAlphabet !== 'all'){
       items = items.reduce(function(ack, item, index, originalArrray) {
          var currentChar = item.name.toLowerCase().substr(0,1);
          if(currentChar == filterAlphabet){
              return [...ack, item];
          }else{
            return ack;
          }
      }, []);
    }
    if(searchText !== ''){
      items = [...exhibitors.filter((exhibitor)=>( exhibitor.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ))];
    }
    setLocExhibitors(items);
    setTimeout(() => {
      element.current.style.opacity = 1;
      element.current.focus();
    }, 30);
  }, [selectedCategory, searchText, filterAlphabet])
  

  const _alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return (
    <div ref={element} style={{opacity: 0}} data-fixed="true" className="ebs-transparent-box">
    <div
      style={{
        backgroundImage: `url(${require("img/h1-parallax1.jpg")})`,
        height: 390,
      }}
      className="edgtf-title edgtf-standard-type edgtf-has-background edgtf-content-left-alignment edgtf-title-large-text-size edgtf-animation-no edgtf-title-image-not-responsive edgtf-title-with-border"
    >
      <div className="edgtf-title-holder">
        <div className="edgtf-container clearfix">
          <div className="edgtf-container-inner container">
            <div className="edgtf-title-subtitle-holder">
              <div className="edgtf-title-subtitle-holder-inner">
                <h1 style={{ color: "white" }}>
                  <span>{ siteLabels.EVENTSITE_EXHIBITORS }</span>
                </h1>
                <div className="edgtf-subtitle" style={{color: '#fff'}}>
                  <span>{ siteLabels.EVENTSITE_EXHIBITORS_SUB }</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    {/* content Section */}
    <div style={{padding: '80px 0', minHeight:"100vh"}}>
      <div className="container">
        <div className="row d-flex">
          <div className="col-lg-3">
            <div className="ebs-form-control-search pb-3"><input className="form-control" placeholder="Search..." onChange={(e)=> { search(e.target.value) }} value ={searchText}type="text" />
              <em className="fa fa-search"></em>
            </div>
            <div className="ebs-filter-box pb-4">
              <h4>Filter by Categories</h4>
              <div className="ebs-filter-items">
                <ul>
                  <li><a className={selectedCategory === 'all' ? 'active' : ''} onClick={()=>{ filterbyCategory('all') }} href="#!">All</a> </li>
                  {
                    exhibitorCategories.map((cat)=>(
                      <li key={cat.id}><a href="#!" className={selectedCategory === cat.id ? 'active' : ''} onClick={()=>{ filterbyCategory(cat.id) }} >{cat.name}</a> </li>
                    ))
                  }

                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="ebs-top-filter-container pb-3">
              <ul>
                <li><a className={filterAlphabet === 'all' ? "active" : ''} onClick={()=>{filterbyAlphabet('all'); }} href="#!">All</a> </li>
                <li><a href="#!">#</a> </li>
                  {_alphabet.split('').map((item,k) =>
                  <li className="alpha"  key={k}><a href="#!" className={filterAlphabet === item ? "active" : ''} onClick={()=>{filterbyAlphabet(item.toLowerCase()); }}>{item}</a></li>
                  )}
              </ul>
            </div>
            <div className="ebs-sponsor-listing">
              {locExhibitors.map((exhibitor)=>(<div className="ebs-sponsor-item" key={exhibitor.id}>
                <div className="d-flex align-items-center ebs-break-block">
                  <div className="ebs-img-listing">
                    <Link to={`/${eventUrl}/exhibitors/${exhibitor.id}`} >
                      <figure>
                        <img src={exhibitor.logo && exhibitor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/exhibitors/" + exhibitor.logo : require('img/exhibitors-default.png')} alt="" />
                      </figure>
                    </Link>
                  </div>
                  <div className="ebs-detail-listing">
                    {exhibitor.name && <Link to={`/${eventUrl}/exhibitors/${exhibitor.id}`}>
                      <h2>{ exhibitor.name }</h2>
                    </Link> 
                    }
                    <div className="d-flex ebs-container-box">
                      {exhibitor.phone_number && <div className="ebs-box"><i className="fa fa-phone" />{exhibitor.phone_number}</div>}
                      {exhibitor.email && <div className="ebs-box"><i className="fa fa-envelope" />{exhibitor.email}</div>}
                      {exhibitor.booth && <div className="ebs-box"><i className="fa fa-bank" />{exhibitor.booth}</div>}
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ExhibitorListing