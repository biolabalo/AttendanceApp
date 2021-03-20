import React, { useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useInput from 'hooks/useInput';
import Input from 'components/Input';
import data from 'data/signIn';
import { axiosInstance } from 'helpers';
import { login } from 'g_actions/user';
import Layout from 'Layout/AuthLayout';
import SubmitButton from 'components/SubmitButton';

function Login() {
  const submitButton = useRef();
  const [reviel, setReviel] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();

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
      const response = await axiosInstance.post('/user/login', inputs);

      addToast(
        `Welcome back ${response.data.data.user.fullName.split(' ')[0]}`,
        {
          appearance: 'success',
          autoDismiss: true,
        }
      );

      dispatch(login(response));
      // response.data.data.role === 'admin'
      //   ? history.push('/admin')
      //   : history.push('/');

      history.push('/');
    },
  });

  const revielPassword = (ref) => {
    setReviel(!reviel);
  };

  return (
    <Layout>
      <div className="auth_section">
        <div className="reg_text">
          <h2>Login</h2>
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
              valErrorMsg={form.valErrorMsg}
              attr={form.attr}
              open={true}
              example={form.example}
            />
          ))}

          <small className="externs">
            <Link to="/forgot">Recover Password</Link>
          </small>

          <SubmitButton
            handleSubmit={handleSubmit}
            btnRef={submitButton}
            text={'Login'}
            loading={loading}
          />
        </form>
      </div>
    </Layout>
  );
}

export default Login;
