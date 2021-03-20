import React from 'react';
import UserCard from 'components/UserCard';
import { useSelector } from 'react-redux';
import Avatar from 'components/Avatar';
import { Loading } from 'views/Staff';

const isWeekend = [0, 6].indexOf(new Date().getDay()) !== -1;
const date = new Date();

const AvatarContainer = () => {
  const { fullName, profilePic, email, role } = useSelector(
    (state) => state.auth?.user || {}
  );

  const data = {
    profilePic,
    fullName,
    email,
    department: role,
    designation: role,
  };

  return (
    <div className="mb-1">
      <Avatar data={data} type="dashboard" />
    </div>
  );
};

const LateComers = ({ data }) => {
  const { isLoading, isError, lateStaffs } = data;

  return (
    <div
      className="flex flex-col flex-grow mt-2 p-4 sm-shadow rounded-md"
      style={{ minHeight: '500px' }}
    >
      <div className="flex justify-between items-center bg-white">
        {!isLoading && !isError && date.getHours() > 9 && (
          <>
            <div className="text-sm text-txt font-semibold">
              Late Employees
            </div>{' '}
            <div className="text-tertiary text-sm">{lateStaffs.length}</div>
          </>
        )}
      </div>

      {date.getHours() >= 10 && isLoading && <Loading />}

      <div>{isWeekend && <p>😉There are not LateComers on weekends 🤩</p>}</div>

      {date.getHours() < 10 && (
        <div className="text-sm text-green-600">
          {' '}
          Late staff records available from 10 am{' '}
        </div>
      )}

      {isError && !isWeekend && <p>Failed to fetch late users</p>}

      <div className="flex-grow overflow-y-scroll p-3 -m-3">
        {date.getHours() > 9 &&
          lateStaffs.map(
            ({ profilePic, checkInTime, fullName, department }, index) => (
              <UserCard
                key={index}
                time={checkInTime}
                imgUrl={profilePic}
                department={department}
                type="late"
                name={fullName}
              />
            )
          )}
      </div>
    </div>
  );
};

const LeftSection = ({ data }) => {
  return (
    <section
      className="all-staff-container px-3 pt-0 rounded-2xl flex flex-col h-full sticky"
      style={{
        minHeight: 'calc(100vh - 80px)',
        top: '60px',
      }}
    >
      <AvatarContainer />
      <LateComers data={data} />
    </section>
  );
};

export default LeftSection;
