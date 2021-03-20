import React, { useRef } from 'react';
import Input from 'components/Input';
import useInput from 'hooks/useInput';
import data from 'data/forgot';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import { axiosInstance } from 'helpers';
import Layout from 'Layout/AuthLayout';
import SubmitButton from 'components/SubmitButton';

function Forgot() {
  const submitButton = useRef();
  const { addToast } = useToasts();

  const [
    handleSubmit,
    handleChange,
    inputTypes,
    validateSelf,
    setValidateSelf,
    ,
    loading,
  ] = useInput({
    inputs: data,
    submitButton,
    cb: async (inputs) => {
      const response = await axiosInstance.post('/user/forgot', inputs);
      if (response) {
        addToast(`A password reset link has been sent to your email`, {
          appearance: 'success',
          autoDismiss: true,
        });
      }
      window.location.href = '/login';
    },
  });


  return (
    <Layout>
      <div className="auth_section">
        <div className="reg_text">
          <h2>Recover Password</h2>
          <p>
            Enter your email address and password reset link will be sent to
            your email.
          </p>
        </div>
        <form className="form">
          {data.map((form, i) => (
            <Input
              key={`login_form_${i}`}
              name={form.name}
              type={form.type}
              placeHolder={form.placeHolder}
              value={inputTypes[form.name]}
              errorMsg={form.errorMsg}
              required={form.required}
              handleChange={handleChange}
              validateSelf={validateSelf}
              setValidateSelf={setValidateSelf}
              attr={form.attr}
            />
          ))}

          <SubmitButton
            btnRef={submitButton}
            handleSubmit={handleSubmit}
            loading={loading}
            text="Send reset link"
          />
        </form>
        <div className="flex justify-center mt-5">
          <small>
            <Link to="/signin">
              <strong className="text-primary">Login</strong> Instead
            </Link>
          </small>
        </div>
      </div>
    </Layout>
  );
}

export default Forgot;
