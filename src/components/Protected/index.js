import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loader from 'components/Loading';
import { useSelector } from 'react-redux';

const Protected = ({ component: Component, ...rest }) => {
  const { user, isStaff } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        !!user ? (
          user.length === 0 ? (
            <Loader />
          ) : isStaff || user.status === 'inactive' ? (
            <Redirect
              to={{
                pathname: '/usage',
              }}
            />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
            }}
          />
        )
      }
    />
  );
};

export default Protected;
