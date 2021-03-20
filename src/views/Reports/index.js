import { useHistory } from 'react-router-dom';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import Attendance from './attendance';
import Events from './events';

const menus = ['Monthly Attendance', 'Events Attendance'];

const url = {
  'Events Attendance': '/event',
  'Monthly Attendance': '/monthly',
};

const LinkCards = ({ title }) => {
  const history = useHistory();
  const urlRoute = '/reports' + url[title];
  return (
    <div
      onClick={() =>
        url[title] ? history.push(urlRoute) : history.push('/reports')
      }
      className='std-box-shadow text-bold text-xl cursor-pointer  h-20 flex items-center text-center justify-center'
    >
      {title}
    </div>
  );
};
const Reports = () => {
  let { path } = useRouteMatch();

  return (
    <section className='w-full'>
      <div className='grid grid-cols-5 gap-5 w-full'>
        {menus.map((item, index) => (
          <LinkCards key={index} title={item} />
        ))}
      </div>

      <Switch>
        <Route path={`${path}/monthly`}>
          <Attendance />
        </Route>

        <Route path={`${path}/event`}>
          <Events />
        </Route>
      </Switch>
    </section>
  );
};

export default Reports;
