import React from 'react';
import AgroMall from '../../assets/images/AgroMall.png';
import { NavLink } from 'react-router-dom';
import SearchBar from 'components/SearchBar';

const Navbar = () => {
  return (
    <header className="bg-gray-50 h-16 sticky top-0 z-30">
      <nav className="flex justify-between items-center nav txt-lit text-sm z-40 container mx-auto h-full">
        <div className="flex-center">
          <div className="mr-4 h-10 w-10 agromall-image-container">
            <img alt="agromall" src={AgroMall} className="mr-2 rounded-full" />
          </div>

          <SearchBar />
        </div>
        <div className="flex txt-lit h-full items-end">
          <div>
            {[
              {
                name: 'Dashboard',
                link: '/dashboard',
              },
              {
                name: 'Employees',
                link: '/employees',
              },
              {
                name: 'Schedule',
                link: '/schedule',
              },
              {
                name: 'Reports',
                link: '/reports',
              },
            ].map(({ link, name }, index) => (
              <NavLink
                key={index}
                className="navbar-item mx-5 pb-4 inline-block text-txt"
                activeClassName="is-active"
                to={link}
              >
                {name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex">
          <div className="mr-5 flex items-center">
            <svg
              viewBox="0 0 15 16"
              version="1.1"
              width="15"
              height="16"
              aria-hidden="true"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z"
              ></path>
            </svg>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
            </svg>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
