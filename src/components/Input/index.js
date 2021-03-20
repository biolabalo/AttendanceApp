import React, { useState, useEffect } from 'react';
import { validateInput, validate } from 'helpers';
import Eye from 'assets/icons/eye';
import Hide from 'assets/icons/hide';
import './style.scss';

const Input = ({
  usage='',
  type = 'text',
  name,
  placeHolder = 'Place Holder',
  value,
  errorMsg = '',
  valErrorMsg,
  required = false,
  validateSelf = false,
  handleChange = () => {},
  reviel,
  revielPassword,
  setValidateSelf,
  attr = {},
  open = false,
  inputValidate = true,
  example,
}) => {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(errorMsg);
  const [internalValue, setInternalValue] = useState('');
  const [typing, setTyping] = useState(false);

  const inputCon = React.createRef();
  const inputRef = React.createRef();

  useEffect(() => {
    if (validateSelf && required) {
      const isValid = validate(value, name);

      if (!isValid) {
        inputCon.current.classList.add('typing', 'invalid');
        inputCon.current.classList.remove('valid');
        setErrorMessage(errorMsg);
        setError(true);
      }
    }

    return () => {};
  }, [inputCon, name, validateSelf, value, required, errorMsg, valErrorMsg]);

  useEffect(() => {
    if (internalValue === '' || !internalValue) {
      setErrorMessage(valErrorMsg);
      inputCon.current.classList.remove('typing');
    } else {
      inputCon.current.classList.add('typing');

      if (inputValidate) {
        const isValid = validate(value, name);

        if (!isValid) {
          inputCon.current.classList.add('invalid');
          inputCon.current.classList.remove('valid');
          setErrorMessage(errorMsg);
          setError(true);
        } else {
          inputCon.current.classList.add('valid');
          inputCon.current.classList.remove('invalid');
          setError(false);
        }
      } else {
        inputCon.current.classList.add('valid');
        inputCon.current.classList.remove('invalid');
      }
    }
    return () => {};
  }, [
    value,
    inputCon,
    valErrorMsg,
    open,
    errorMsg,
    inputValidate,
    name,
    required,
    internalValue,
  ]);

  function addCommas(x) {
    x = x.split(',').join('');

    if (x === '') return '';
    if (!Number(x)) return value;

    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  const validateOne = (event) => {
    if (type === 'formattednumber') {
      event.target.value = addCommas(event.target.value);
    }

    handleChange(event, error);
    setInternalValue(event.target.value);

    if (!inputValidate) {
      if (value) {
        inputCon.current.classList.add('typing');
      }
      return;
    }

    setValidateSelf && setValidateSelf(false);
    if (!validateInput(event)) {
      inputCon.current.classList.add('invalid');
      inputCon.current.classList.remove('valid');

      setErrorMessage(errorMsg);
      setError(true);
    } else {
      inputCon.current.classList.remove('invalid');
      inputCon.current.classList.add('valid');

      setError(false);
    }

    setInternalValue(event.target.value);
  };

  return (
    <div 
    className={`input-div ${usage && usage === "sidebar" ? "add-user-box-shadow" : ""}`}
    >
      <div className="input">
        <div
         className={`${usage && usage === "sidebar" ? " input-con add-user-box-shadow" : "input-con" }`}
         ref={inputCon}>
          {type === 'textarea' ? (
            <textarea
              className="input-type"
              required={required}
              name={name}
              onChange={validateOne}
              value={value}
              rows={5}
              ref={inputRef}
              placeholder={example && (typing || error) ? example : ''}
            />
          ) : (
            <>
              <input
                onFocus={() => setTyping(true)}
                onBlur={() => setTyping(false)}
                className="input-type"
                type={reviel ? 'text' : type}
                required={required}
                name={name}
                onChange={validateOne}
                value={value}
                ref={inputRef}
                {...attr}
                placeholder={example && (typing || error) ? example : ''}
              />
            </>
          )}
          <span style={{ zIndex: '-1' }} className="place-holder">
            {placeHolder}
          </span>
          {error && (
            <span className="grow absolute h-1 w-full bottom-0 left-0"></span>
          )}
          {value && type === 'password' ? (
            <span
              onClick={() => {
                setShowPassword(!showPassword);
                revielPassword();
              }}
              className="reviel-password"
            >
              {!showPassword ? <Eye className="" /> : <Hide className="" />}
            </span>
          ) : null}

          <p
            className="error absolute right-0 top-0 mr-2.5 text-tomato"
            style={{ display: error ? 'block' : 'none' }}
          >
            {errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Input;
