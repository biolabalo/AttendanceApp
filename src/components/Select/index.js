import React, { useState, useEffect } from 'react';
import '../Input/style.scss';
import { stringSearch } from 'helpers';

const Select = ({
  name,
  placeHolder = '',
  inputs,
  label = '',
  handleSelect = () => {},
  required,
  value = '',
  useSearch = false,
  useArrow = true,
  index,
  attr = {},
}) => {
  const [openDrop, setOpenDrop] = useState(false);
  const [presentValue, setPresentValue] = useState(value);
  const [presentText, setPresentText] = useState('');
  const [innerInputs, setInnerInputs] = useState(inputs);
  const [searchQuery, setSearchQuery] = useState('');

  const selectRef = React.createRef();
  const parent = React.createRef();

  useEffect(() => {
    const val = innerInputs.find((input) => input.value === value);

    setPresentValue(value);
    setPresentText(`${val ? val.name : ''}`);

    return () => {};
  }, [label, required, innerInputs, value]);

  useEffect(() => {
    if (searchQuery !== '') {
      setInnerInputs(
        inputs.filter((input) => stringSearch(searchQuery, input.name))
      );
    } else setInnerInputs(inputs);

    return () => {};
  }, [searchQuery, inputs]);

  const handleClick = (name, value, current_name) => {
    setPresentValue(value);
    setPresentText(current_name);
    setOpenDrop(false);
    let target = { name, value };
    handleSelect({ target });
  };

  const handleChange = (event, error) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const revileDropDown = () => {
    if (attr.disabled) return;
    setOpenDrop(!openDrop);
  };

  const close = (e) => {
    const leavingParent = !parent.current.contains(e.relatedTarget);

    if (leavingParent) {
      // if (presentValue) return;
      setOpenDrop(false);
    }
  };

  const options = innerInputs.map((input, index) => {
    return (
      <button
        className={`options block w-full p-2.5 rounded-sm text-left text-txt ${
          input.value === presentValue ? 'selected' : ''
        }`}
        type="button"
        key={index}
        value={input.value}
        onClick={() => handleClick(name, input.value, input.name)}
      >
        {input.name}
      </button>
    );
  });

  return (
    <div
      className={`input-div select_op`}
      onBlur={close}
      tabIndex={-1}
      ref={parent}
      {...attr}
    >
      <div className="input">
        <div className="input-con" style={{ zIndex: openDrop ? 50 : 0 }}>
          {/* <div className="input-type"> */}
          <div
            className={`select input-type relative z-0 ${
              openDrop || presentValue !== '' ? 'open-drop' : ''
            }`}
            ref={selectRef}
            tabIndex={-1}
          >
            <button
              className={`currentValue flex justify-between items-center w-full text-left pr-8 ${
                openDrop ? 'open-drop' : ''
              }${useArrow ? ' arrow' : ''}`}
              type="button"
              onClick={revileDropDown}
            >
              {openDrop || presentValue.toString() ? (
                <p>{presentText ? presentText : label}</p>
              ) : (
                <p></p>
              )}
            </button>
            <div
              className={`dropDownButtons absolute bg-white shadow-md w-full text-txt overflow-hidden opacity-0 invisible top-0 mt-5 left-0 ml-5 z-10 rounded-sm  ${
                openDrop ? 'open-drop' : 'close'
              }`}
            >
              {useSearch ? (
                <div className="search-input w-full border border-txt-lit mb-1.5 rounded-sm p-2.5 sticky top-2 mt-2 bg-white">
                  <input
                    className="border-none"
                    type="text"
                    placeholder="search"
                    onChange={handleChange}
                    value={searchQuery}
                  />
                </div>
              ) : null}
              {options}
            </div>
            {/* </div> */}
          </div>

          <div className="place-holder">{placeHolder}</div>
        </div>
      </div>
    </div>
  );
};

export default Select;
