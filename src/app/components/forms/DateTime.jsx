import React, { ReactElement, FC} from 'react';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

type Props = {
  value: any;
  onChange: any;
  onBlur: any;
  placeholder: any;
  required: any;
  showtime: boolean;
  showdate: boolean;
}

class MyDTPicker extends React.Component<Props> {
  render() {
    return <Datetime onChange={this.props.onChange} value={this.props.value} timeFormat={this.props.showtime} dateFormat={this.props.showdate} inputProps={{ placeholder: this.props.placeholder, required: this.props.required }} renderInput={this.renderInput} />;
  }
  renderInput(props:any) {
    return (
      <div className="DayPickerInput">
      <label className="label-input">
      <input {...props} placeholder=' ' />
      <span>{props.placeholder}{props.required && <em className="req">*</em>}</span>
    </label>
    </div>
    );
  }
}

type DateTimeProps = {
  label?: any;
  value?: any;
  showtime?: boolean;
  showdate?: boolean;
  onChange?: any;
  required?: any;
  toDate?: any;
  fromDate?: any;
}

const DateTime: FC<DateTimeProps> = (props): ReactElement => {
  return (
    <MyDTPicker onChange={props.onChange} value={props.value} showtime={props.showtime !== undefined ? props.showtime : false} showdate={props.showdate !== undefined ? props.showdate : true} placeholder={props.label} />
  )
};

export default DateTime;
