import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from 'assets/images/AgroMall.png';
// import logo from 'assets/logo.png';
import bg from 'assets/images/home.png';
import './style.scss';

const Auth = ({ children }) => {
  const { pathname } = useLocation();
  const route_path = pathname.split('auth/')[1];

  const data = {
    signin: 'Login',
    forgot: 'Forgot Password',
    'reset-password': 'Reset your password',
    usage: 'Usage',
  };

  return (
    <main className="auth flex flex-col min-h-screen h-screen w-screen">
      <div className="a_img w-full h-full">
        <div
          className="h-full w-full max-w-5/8 lg:max-w-full"
          style={{
            background: `linear-gradient(131.76deg, rgba(38, 165, 149, 0.92) 25.59%, rgba(255, 196, 68, 0.6) 106.73%), no-repeat url(${bg}) center/cover`,
          }}
        >
          <div className="w-full h-full overflow-hidden flex items-end lg:items-start lg:justify-center">
            <div className=" mb-32 ml-32 max-w-1/2 lg:max-w-full lg:ml-0 lg:mt-10">
              <img
                src={logo}
                alt="Agromall logo"
                className="w-14 h-14 rounded-full mb-5 sm:w-8 sm:h-8 sm:mb-3"
              />

              <h1 className="text-4xl text-white md:text-base font-semibold">
                HR ATTENDANCE MANAGEMENT SYSTEM
              </h1>
            </div>
            {/* <h1></h1> */}
          </div>
        </div>
      </div>
      <div className="auth_card flex flex-col justify-center items-center absolute w-full h-full">
        <div className=" bg-white rounded-md py-10 px-7 max-w-sm w-10/12 shadow-md transform translate-x-1/2 lg:translate-x-0">
          {data[route_path] === 'Usage' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>Oops!</h2>
              <p>
                You do not have the access to view this page, please contact the
                Admin
              </p>
              <div className="flex-row j-end" style={{ marginTop: '20px' }}>
                <Link to="/signin">
                  <small className="theme-color">Login</small>
                </Link>
              </div>
            </div>
          )}

          {children}
        </div>
      </div>
    </main>
  );
};

export default Auth;
