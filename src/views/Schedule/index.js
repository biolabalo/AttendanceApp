import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, Route, Switch, Link } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import { getAllTeams, getAllUsers, deleteTeam } from 'g_actions/teams';
import { getAllEvents } from 'g_actions/events';
import Delete from 'assets/icons/delete';
import Close from 'assets/icons/close';
import TeamMembers from './TeamMembers';
import loader from 'assets/images/loader.gif';
import ListTeams from './ListTeamMembers';

const Schedule = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.teams);
  const events = useSelector((state) => state.events);
  const [loadingTeams, , fetchTeams] = useFetch(dispatch, !state?.teams, true);
  const [loadingUsers, , fetchUsers] = useFetch(dispatch, !state?.users, true);
  const [loadingEvents, , fetchEvents] = useFetch(dispatch, !events, true);
  const [deleting, setDeleting] = useState(false);
  const [addTeam, setAddTeam] = useState();
  const { path } = useRouteMatch();

  useEffect(() => {
    if (loadingTeams) {
      fetchTeams(() => getAllTeams());
    }
  }, [loadingTeams, fetchTeams]);

  useEffect(() => {
    if (loadingUsers) {
      fetchUsers(() => getAllUsers());
    }
  }, [loadingUsers, fetchUsers]);

  useEffect(() => {
    if (loadingEvents) {
      fetchEvents(() => getAllEvents());
    }
  }, [loadingEvents, fetchEvents]);

  const close = () => {
    setAddTeam(false);
  };

  const deleteTeamhandler = async (name) => {
    setDeleting(name);
    await dispatch(deleteTeam(name));
    setDeleting(null);
  };

  return (
    <>
      <aside
        style={{ height: 'calc(100vh - 80px)' }}
        className="sm-shadow max-w-xs w-full rounded-md p-3 flex flex-col"
      >
        <nav className="flex items-center justify-between mb-5">
          <div className="flex">
            <h3 className="text-txt mr-5">Teams</h3>
            <p
              className="flex-center bg-primary text-white w-6 h-6 rounded-full cursor-pointer"
              onClick={() => setAddTeam(true)}
            >
              <span className="leading-4">+</span>
            </p>
          </div>
          <p className="text-primary font-semibold text-sm">
            {state?.teams?.length || 0}
          </p>
        </nav>
        {loadingTeams || loadingUsers ? (
          <p>Loading...</p>
        ) : (
          <ul className="flex-grow overflow-scroll min-h-0 p-1">
            {state?.teams?.map((team, i) => (
              <li
                key={`team_list_${i}`}
                className="mb-3 rounded-md overflow-hidden h-14 relative shadow-green team-card transition-all duration-200 cursor-pointer -p-1"
              >
                <Link to={`/schedule/${team.code.toLowerCase()}`}>
                  <div className="flex h-full w-full">
                    <div className="bg-primary-fade w-14 flex-center font-bold text-2xl text-primary mr-3">
                      <p>{team.code[0]}</p>
                    </div>
                    <div className="w-full flex flex-col justify-between p-1 text-sm text-txt">
                      <p className="font-semibold">{team.code}</p>
                      <p className="text-primary text-xs">
                        Members{' '}
                        <strong className="text-txt">
                          {
                            state?.users?.filter(
                              (user) => user.department === team.code
                            ).length
                          }
                        </strong>
                      </p>
                    </div>
                    <div className="bg-white p-2 top-1 right-1 absolute flex icon-sec opacity-0 transition-all duration-200 items-start">
                      {/* <span
                      className="cursor-pointer"
                      // onClick={() => setAddTeam(team)}
                    >
                      <Edit className="w-4 h-4 mr-3" />
                    </span> */}
                      <span
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteTeamhandler(team.code);
                        }}
                      >
                        <Delete className="w-4 h-4" />
                      </span>

                      {deleting === team.code && (
                        <div className="relative w-8 h-8">
                          <img
                            src={loader}
                            alt="loading"
                            className="w-full h-full object-cover absolute -top-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <section className="w-full h-full flex-grow">
        <Switch>
          <Route path={`${path}/:team`}>
            <ListTeams />
          </Route>
        </Switch>
      </section>

      <aside
        className={`sm-shadow max-w-sm w-full flex flex-col rounded-md p-5 absolute h-screen top-0 z-50 bg-white transition-all duration-300 ${
          !!addTeam ? 'right-0' : '-right-full'
        }`}
      >
        <nav className="text-txt flex items-center justify-between mb-10">
          <h3>Add New Team</h3>
          <span className="cursor-pointer" onClick={close}>
            <Close className="fill-current w-4 h-4" />
          </span>
        </nav>

        {!!addTeam && <TeamMembers close={close} />}
      </aside>
    </>
  );
};

export default Schedule;
