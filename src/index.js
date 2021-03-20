import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';
import { Provider, useDispatch } from 'react-redux';
import { login } from './g_actions/user';
import App from './AppMain';
import store from './store';
import './index.scss';
import reportWebVitals from './reportWebVitals';

let RouteApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login());
    return () => {};
  }, [dispatch]);

  return <App />;
};

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <RouteApp />
    </ToastProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
