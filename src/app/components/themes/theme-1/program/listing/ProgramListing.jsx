import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import HeadingElement from "@/ui-components/HeadingElement";
import ProgramItem from './components/ProgramItem';
import WorkShop from './components/WorkShop';
import moment from 'moment';
import ReactSelect from 'react-select';
const customStyles = {
  control: base => ({
    ...base,
    height: 60,
    minHeight: 60,
    backgroundColor: '#F4F4F4',
    borderColor: '#ced4da',
    width: '100%',
    maxWidth: '100%'
  })
};
const ProgramListing = ({programs, value, setValue}) => {
  const { event } = useSelector(eventSelector);
  const eventUrl = event.url;
  return (
    <div data-fixed="false" style={{ padding: "80px 0" }} className="module-section ebs-program-listing-wrapper ebs-transparent-box">
      <div className="container">
        <HeadingElement dark={false} label={'Schedule Programs'} desc={''} align={'center'} />
      </div>
      <div className="ebs-program-top">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-5">
              <div style={{maxWidth: 440}} className="ebs-form-control-search pb-3"><input className="form-control" placeholder="Search..." defaultValue={value} type="text" onChange={(e) => setValue(e.target.value)} />
                <em className="fa fa-search"></em>
              </div>
            </div>
            <div className="col-md-7">
              <div className="row flex-row-reverse">
                <div className="col-md-5 col-6">
                  <ReactSelect
                    styles={customStyles}
                    placeholder="Select date"
                    components={{ IndicatorSeparator: null }}
                    options={[
                      { value: '24-12-2022', label: '24-12-2022' },
                      { value: '25-12-2022', label: '25-12-2022' },
                      { value: '26-12-2022', label: '26-12-2022' },
                    ]}
                  />
                </div>
                <div className="col-md-5 col-6">
                  <ReactSelect
                    styles={customStyles}
                    placeholder="Select track"
                    components={{ IndicatorSeparator: null }}
                    options={[
                      { value: '24-12-2022', label: '24-12-2022' },
                      { value: '25-12-2022', label: '25-12-2022' },
                      { value: '26-12-2022', label: '26-12-2022' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="container">
          <div className="ebs-main-program-listing">
            {programs && programs.map((program ,k ) => (
                <div className="ebs-program-parent">
                  {program[0] && <div className="ebs-date-border">{program[0].heading_date}</div>}
                  {program.map((item,i) =>(
                      item.workshop_id > 0  ? 
                      <WorkShop item={item} key={k} />:
                      <ProgramItem program={item} key={k} />
                  ))}
                  
                </div>

              ))}
          </div>
        </div>
    </div>
  )
}

export default ProgramListing