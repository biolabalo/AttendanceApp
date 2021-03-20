import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Protected from 'components/Protected';

import Forgot from 'views/Auth/Forgot';
import Login from 'views/Auth/Login';
import Usage from 'views/Auth/Usage';
import Reset from 'views/Auth/Reset';
import { hot } from 'react-hot-loader';
import Loader from 'components/Loading';
import './App.scss';
import Dashboard from './App';

function App() {
  return (
    <main className="App h-screen">
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/forgot" component={Forgot} />
            <Route path="/signin" component={Login} />
            <Route path="/reset-password" component={Reset} />
            <Route path="/usage" component={Usage} />
            <Protected path="/" component={Dashboard} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
}

export default hot(module)(App);
