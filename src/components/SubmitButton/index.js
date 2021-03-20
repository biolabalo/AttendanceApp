import React, { useRef } from 'react';
import Button from 'components/Button';
import loader from 'assets/images/loader.gif';

const SubmitButton = ({ btnRef, handleSubmit, loading, text, disabled }) => {
  const intRef = useRef();
  return (
    <Button
      disabled={disabled}
      btnRef={btnRef || intRef}
      onClick={handleSubmit}
    >
      <p className="text-white">{text}</p>
      {loading && (
        <div className="relative w-5 h-5 ml-3">
          <img
            src={loader}
            alt="loading"
            className="w-10 h-10 object-cover block top-1/2 transform -translate-y-1/2 absolute"
          />
        </div>
      )}
    </Button>
  );
};

export default SubmitButton;
