import React, { createRef } from 'react';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

class MyDTPicker extends React.Component {
  constructor(props) {
    super(props);
     this.textInput = createRef(null);

  }
  
  render() {
    const renderView = (mode, renderDefault, showTime,showDate,) => {
    // Only for years, months and days view
    return (
      <div className="ebs-date-wrapper">
        {showTime && showDate && <div className="ebs-top-caption">
          <label className='ebs-days'> <input defaultChecked onChange={() => this.textInput.current?.navigate('days')} type="radio" name="calendar" />
            <span><i className="material-icons">calendar_month</i></span>
          </label>
          <label className='ebs-time'> <input onChange={() => this.textInput.current?.navigate('time')} type="radio" name="calendar" />
            <span><i className="material-icons">schedule</i></span>
          </label>
        </div>}
        {renderDefault()}
      </div>
    );
  };
    return <Datetime ref={this.textInput} renderView={(mode, renderDefault) => renderView(mode, renderDefault, this.props.showtime,this.props.showdate)} initialViewMode={this.props.showdate ? 'days' : 'time'} closeOnSelect={this.props.showtime ? false : true} onChange={this.props.onChange} value={this.props.value} timeFormat={this.props.showtime} dateFormat={this.props.showdate} inputProps={{ placeholder: this.props.placeholder, required: this.props.required, disabled: this.props.readOnly, clear:this.props.clear }} renderInput={this.renderInput} />;
  }
  renderInput(props) {
    return (
      <div className="DayPickerInput">
      <label className="label-input">
      <input readOnly {...props} placeholder=' ' />
      <span>{props.placeholder}{props.required && <em className="req">*</em>}</span>
      {props.clear === 1 && props.value !== '' && <div className='clear-date-btn' onClick={() => {props.onChange('')}}>Clear</div>}
    </label>
    </div>
    );
  }
}



const DateTime = ({label,value,showtime,showdate,onChange,required,toDate,fromDate, readOnly, clear}) => {
  return (
    <MyDTPicker onChange={onChange} value={value} readOnly={readOnly} clear={clear} showtime={showtime !== undefined ? showtime : false} showdate={showdate !== undefined ? showdate : true} placeholder={label} />
  )
};

export default DateTime;
