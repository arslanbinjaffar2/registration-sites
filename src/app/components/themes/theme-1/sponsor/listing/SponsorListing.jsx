import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

const SponsorListing = ({sponsors, sponsorCategories, labels, eventUrl, siteLabels}) => {
  const [locSponsors, setLocSponsors] = useState(sponsors);
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
    let items = sponsors;
    if(selectedCategory !== 'all')
    items =[...items.filter((sponsor)=> (
      sponsor.categories.filter((cat)=>( cat.id === selectedCategory)).length > 0
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
      items = [...sponsors.filter((sponsor)=>( sponsor.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ))];
    }

    setLocSponsors(items);
    setTimeout(() => {
      element.current.style.opacity = 1;
      element.current.focus();
    }, 500);
  }, [selectedCategory, searchText, filterAlphabet])
  

  const _alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return (
    <div style={{opacity: 0}} ref={element} data-fixed="true" className="ebs-transparent-box">
    <div
      style={{
        backgroundImage: `url(${require("img/h1-parallax1.jpg")})`,
        height: 390,
      }}
      className="edgtf-title edgtf-standard-type edgtf-has-background edgtf-content-left-alignment edgtf-title-large-text-size edgtf-animation-no edgtf-title-image-not-responsive edgtf-title-with-border"
    >
      <div className="edgtf-title-holder">
        <div className="edgtf-container clearfix">
          <div className="edgtf-container-inner">
            <div className="edgtf-title-subtitle-holder">
              <div className="edgtf-title-subtitle-holder-inner">
                <h1 style={{ color: "white" }}>
                  <span>{ siteLabels.EVENTSITE_SPONSORS }</span>
                </h1>
                <div className="edgtf-subtitle" style={{color: '#fff'}}>
                  <span>{ siteLabels.EVENTSITE_SPONSORS_SUB}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    {/* content Section */}
    <div style={{padding: '80px 0' , minHeight:"100vh"}}>
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
                    sponsorCategories.map((cat)=>(
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
              {locSponsors.map((sponsor)=>(<div className="ebs-sponsor-item" key={sponsor.id}>
                <div className="d-flex align-items-center ebs-break-block">
                  <div className="ebs-img-listing">
                    <Link to={`/${eventUrl}/sponsors/${sponsor.id}`}>
                      <figure>
                        <img src={sponsor.logo && sponsor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/sponsors/" + sponsor.logo : require('img/exhibitors-default.png')} alt="" />
                      </figure>
                    </Link>
                  </div>
                  <div className="ebs-detail-listing">
                    {sponsor.name && 
                      <Link to={`/${eventUrl}/sponsors/${sponsor.id}`}>
                        <h2>{ sponsor.name }</h2>
                      </Link>
                    }
                    <div className="d-flex ebs-container-box">
                      {sponsor.phone_number && <div className="ebs-box"><i className="fa fa-phone" />{sponsor.phone_number}</div>}
                      {sponsor.email && <div className="ebs-box"><i className="fa fa-envelope" />{sponsor.email}</div>}
                      {sponsor.booth && <div className="ebs-box"><i className="fa fa-bank" />{sponsor.booth}</div>}
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
    {/* content Section */}
    </div>
  )
}

export default SponsorListing