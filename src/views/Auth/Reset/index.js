import React, { useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Input from 'components/Input';
import useInput from 'hooks/useInput';
import data from 'data/reset';
import { useToasts } from 'react-toast-notifications';
import { axiosInstance } from 'helpers';
import Layout from 'Layout/AuthLayout';
import SubmitButton from 'components/SubmitButton';

function Reset() {
  const submitButton = useRef();
  const [reviel, setReviel] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  const location = useLocation();

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
    btnText: {
      loading: 'Reseting...',
      reg: 'Reset',
    },
    cb: async (inputs) => {
      if (inputs.password !== inputs.cpassword) {
        addToast(`Please make sure that the passwords are the same`, {
          appearance: 'error',
          autoDismiss: true,
          autoDismissTimeout: 10000,
        });
        submitButton.current.children[0].innerHTML = 'Reset';
        submitButton.current.disabled = false;
        submitButton.current.classList.remove('use_loader');
        return;
      }

      const data = Object.keys(inputs).reduce((acc, input) => {
        if (input !== 'cpassword') {
          return { ...acc, [input]: inputs[input] };
        }
        return { ...acc };
      }, {});

      const response = await axiosInstance.post(
        `/user/change-password${location.search}`,
        data
      );

      if (response) {
        addToast('Successfull updated', {
          appearance: 'success',
          autoDismiss: true,
        });

        history.push('/signin');
      }
    },
  });

  const revielPassword = (ref) => {
    setReviel(!reviel);
  };

  return (
    <Layout>
      <div className="auth_section">
        <div className="reg_text">
          <h2>Create New Password</h2>
          <p>Create a new password for your account</p>
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
              reviel={form.type === 'password' ? reviel : false}
              revielPassword={revielPassword}
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
            text="Reset Password"
          />
        </form>
      </div>
    </Layout>
  );
}

export default Reset;
