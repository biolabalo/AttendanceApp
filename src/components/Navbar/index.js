import React from 'react';
import { NavLink } from 'react-router-dom';
import { logOut } from 'helpers'


const Navbar = () => {
  return (
    <header className="bg-gray-50 h-16 sticky top-0 z-30">
      <nav className="flex justify-between items-center nav txt-lit text-sm z-40 container mx-auto h-full">
        <div className="flex-center">
          <div className="mr-4 h-10 w-10 agromall-image-container">

          </div>

     
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
            <p 
             onClick={logOut}
            className='cursor-pointer'> Logout </p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
