import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserCard from './userCard';
import ScheduleTeamsMembers from './ScheduleTeamsMembers';

const ListTeamMembers = () => {
  const { team } = useParams();
  const [currentTeam, setCurrentTeam] = useState();
  const [currentUser, setCurrentUser] = useState();
  const teams = useSelector((state) => state.teams);

  useEffect(() => {
    if (!teams?.users) return;

    setCurrentTeam(
      teams.users.filter((user) => user?.department?.toLowerCase() === team)
    );
  }, [team, teams?.users, setCurrentTeam]);

  const close = () => {
    setCurrentUser(null);
  };

  return (
    <div style={{ height: 'calc(100vh - 80px)' }} className="flex">
      <div className="sm-shadow min-w-sm h-full p-5 ml-10">
        {!teams?.users && <p className="text-txt">Loading...</p>}
        {teams?.users && currentTeam && (
          <>
            <nav className="text-txt mb-4">
              <h2 className="capitalize font-semibold mb-2">
                {currentTeam[0].department || team}
              </h2>

              <p>Members</p>
            </nav>

            <ul className="list-none">
              {currentTeam.map((user) => (
                <UserCard
                  key={`schedule_sec_${user.email}`}
                  user={user}
                  onClick={setCurrentUser}
                  deleteUser
                />
              ))}
            </ul>
          </>
        )}
      </div>

      {currentUser && <ScheduleTeamsMembers currentUser={currentUser} close={close} />}
    </div>
  );
};

export default ListTeamMembers;
