import React, { Component } from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
type Props = {
  message: string;
};
type State = {
  from: any; 
  to: any; 
};
type MyProps = {
  value: any; 
  onFocus: any; 
  onBlur: any; 
  placeholder: any; 
};
class MyInput extends React.Component<MyProps> {
  focus = () => {
    this.input.focus();
  };
  render() {
    let { value, onFocus, onBlur, placeholder }:MyProps = this.props;
    return (
      <label className="label-input">
        <input placeholder=' ' value={value} ref={el => (this.input = el)} onBlur={onBlur} onClick={onFocus} onFocus={onFocus} readOnly />
        <span>{placeholder}<em className="req">*</em></span>
      </label>
    );
  }
}
export default class DateRange extends React.Component<Props, State>  {
  state:State = {
    from: undefined,
    to: undefined,
  };
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const FORMAT = 'DD/MM/YYYY';
    return (
      <>
        <div className="date-booking">
          <DayPickerInput
            component={MyInput}
            placeholder="From"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: [{ after: to, before: new Date() }],
              toMonth: to,
              modifiers,
              numberOfMonths: 2,
              onDayClick: () => this.to.getInput().focus(),
            }}
           
            format={FORMAT}
          />
        </div>
        <div className="date-booking check-out">
          <DayPickerInput
            ref={(el) => (this.to = el)}
            component={MyInput}
            value={to}
            placeholder="To"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
            }}
            format={FORMAT}
          />
        </div>
      </>
    );
  }
}
