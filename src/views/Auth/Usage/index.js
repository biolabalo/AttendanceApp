import React from 'react';
import { Link } from 'react-router-dom';
import Layout from 'Layout/AuthLayout';

function Forgot() {
  return (
    <Layout>
      <div>
        <h2 className="text-xl text-primary mb-5">Oops!</h2>
        <p>
          You do not have the access to view this page, please contact the Admin
        </p>
        <div className="flex justify-end" style={{ marginTop: '20px' }}>
          <Link to="/signin">
            <strong className="text-primary text-sm">Login</strong>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Forgot;
