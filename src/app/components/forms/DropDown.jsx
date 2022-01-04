/** @jsx jsx */
import React, { ReactElement, FC, useState, useEffect } from "react";
import Select from 'react-select';
import { defaultTheme } from 'react-select';
import { jsx } from '@emotion/react'

const { colors } = defaultTheme;

type MyProps = {
  label?: any;
  listitems?: any;
  required?: any;
  className?: any;
  onChange?: any;
  isSearchable?: any;
  isDisabled?: any;
  isMulti?: any;
  selected?: any;
  selectedlabel?: any;
};

const DropDown: FC<MyProps> = (props): ReactElement => {

  const { label, listitems, required, onChange, className } = props;

  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState(props.selected);

  const [selectedlabel, setSelectedLabel] = useState(props.selectedlabel);

  const [selectedOption, setSelectedOption] = useState(selected ? { label: props.selectedlabel, value: props.selected } : null);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const isSearchable =
    props.isSearchable !== undefined
      ? props.isSearchable
      : true;

  const isDisabled =
    props.isDisabled !== undefined
      ? props.isDisabled
      : false;

  const isMulti =
    props.isMulti !== undefined
      ? props.isMulti
      : false;

  const options = listitems.map((item: any, index: any) => {
    return {
      label: item.name,
      value: item.id,
      key: index
    }
  });

  const style = {
    control: (base: any) => ({
      ...base,
      border: 0,
      boxShadow: 'none'
    })
  };

  const Blanket = (props: any) => (
    <div
      className="blanket-wrapper"
      {...props}
    />
  );

  const DropdownIndicator = () => (
    <div css={{ color: colors.neutral20, height: 24, width: 32 }}>
      <Svg>
        <path
          d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </Svg>
    </div>
  );

  const Svg = (p: any) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
      role="presentation"
      {...p}
    />
  );

  useEffect(() => {
    if (selected !== props.selected || selectedlabel !== props.selectedlabel) {
      setSelected(props.selected);
      setSelectedLabel(props.selectedlabel);
      setSelectedOption({ label: props.selectedlabel, value: props.selected });
      setOpen(false);
    }
  }, [props, selected, selectedlabel]);

  return (
    <React.Fragment>
      {!isMulti ? (
        <div className={`${selectedOption && !label ? 'no-label wrapper-select isSelected' : selectedOption ? 'wrapper-select isSelected' : 'wrapper-select'} ${open && 'isOpen'} ${isDisabled && 'isDisabled'} ${!isSearchable && 'searchFalse'}`}>
          <label
            onClick={toggleOpen}
            className="label-wrapper-select">
            <div className="btn-wrapper">{selectedOption ? selectedOption.label : label}</div>
            {label && <span className="label-text">{label} {required && <em className="req">*</em>} </span>}
            <i className='icon-right material-icons'>{isDisabled ? 'lock' : 'keyboard_arrow_down'}</i>
          </label>
          {open && !isDisabled && (
            <Select
              autoFocus
              backspaceRemovesValue={false}
              className={className}
              components={{ DropdownIndicator, IndicatorSeparator: null }}
              value={selectedOption}
              onChange={onChange}
              options={options}
              promptTextCreator={false}
              placeholder='search'
              styles={style}
              controlShouldRenderValue={isMulti ? true : false}
              hideSelectedOptions={false}
              isClearable={false}
              isSearchable={isSearchable}
              isDisabled={isDisabled}
              isMulti={isMulti}
              menuIsOpen
            />
          )}
          {open && !isDisabled ? <Blanket onClick={toggleOpen} /> : null}
        </div>
      ) : (
        <label className={`${isDisabled && "isDisabled"} wrapper-select select-multi`}>
          <Select
            autoFocus={isDisabled ? false : true}
            components={{ IndicatorSeparator: null }}
            backspaceRemovesValue={false}
            className={className}
            value={selected}
            onChange={onChange}
            options={options}
            promptTextCreator={false}
            placeholder={label ? label : 'Search'}
            styles={style}
            controlShouldRenderValue={isMulti ? true : false}
            hideSelectedOptions={false}
            isClearable={false}
            isSearchable={true}
            isMulti={isMulti}
          />
        </label>
      )}
    </React.Fragment>
  );
};

export default DropDown;