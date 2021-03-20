import { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import Layout from 'Layout/Dashboard';
import Loader from 'components/Loading';
import Dashboard from 'views/HR';

const Staff = lazy(() => import('views/Staff'));
const Schedule = lazy(() => import('views/Schedule'));
const Reports = lazy(() => import('views/Reports'));

const AppMain = () => {
  const Routes = () => {
    return (
      <>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Route exact path={['/dashboard', '/']} component={Dashboard} />
            <Route path="/employees" component={Staff} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/reports" component={Reports} />
          </Suspense>
        </Layout>
      </>
    );
  };

  return <Routes />;
};

export default AppMain;
