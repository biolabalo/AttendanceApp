import React, { useState } from 'react';
import PieChart from 'components/PieChart';
import UserCard from 'components/UserCard';
import { Loading } from 'views/Staff';
import Graph from './graph';

const AVAILABLE_ABSENT_REMOTE = ({ data }) => {
  const [activeDiv, setActiveDiv] = useState(0);

  const { isLoading, isError, earlyStaffs, absentStaffs, remoteStaffs } = data;

  return (
    <div
      className="w-1/4 flex-grow h-full overflow-scroll std-box-shadow"
      style={{ maxHeight: '800px' }}
    >
      <div className="available-absent-remote  rounded-lg  h-full  flex flex-col">
        <div className="flex text-center sticky bg-white top-0 cursor-pointer rounded-lg">
          <div
            className={`w-1/3 p-3 text-sm  ${
              activeDiv === 0 ? 'bg-primary text-white' : 'text-txt'
            } `}
            onClick={() => setActiveDiv(0)}
          >
            Punctual
          </div>
          <div
            className={`w-1/3 p-3 text-sm  ${
              activeDiv === 1 ? 'bg-tomato  text-white' : 'bg-white text-txt'
            } `}
            onClick={() => setActiveDiv(1)}
          >
            Absent
          </div>
          <div
            className={`w-1/3 p-3 text-sm ${
              activeDiv === 2 ? 'bg-secondary  text-white ' : 'text-secondary'
            } `}
            onClick={() => setActiveDiv(2)}
          >
            Remote
          </div>
        </div>

        <div className="px-2 flex-grow  min-h-0">
          {isLoading && <Loading />}

          {!isLoading && isError && <p>Failed to get staffs</p>}

          {activeDiv === 0 &&
            earlyStaffs.map(
              ({ profilePic, checkInTime, fullName, department }, index) => (
                <UserCard
                  key={index}
                  time={checkInTime}
                  imgUrl={profilePic}
                  department={department}
                  type="early"
                  name={fullName}
                />
              )
            )}

          {activeDiv === 1 &&
            absentStaffs.map(
              ({ profilePic, time, fullName, department }, index) => (
                <UserCard
                  key={index}
                  time={time}
                  imgUrl={profilePic}
                  department={department}
                  type="absent"
                  name={fullName}
                />
              )
            )}

          {activeDiv === 2 &&
            remoteStaffs.map(
              ({ profilePic, time, fullName, department }, index) => (
                <UserCard
                  key={index}
                  time={time}
                  imgUrl={profilePic}
                  department={department}
                  type="remote"
                  name={fullName}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};

const BottomCardSection = ({ data, cardStats }) => {
  const { isLoading, isError } = data;
  const { absentCount, lateCount, earlyCount, staffCount } = cardStats;

  return (
    <div className="flex-grow">
      <div className="flex justify-between h-full">
        <div className="w-3/4 pr-3 flex flex-col">
          <div className="flex justify-between flex-wrap">
            <PieChart
              text="Availabile Employees"
              progress={
                isLoading || isError
                  ? 0
                  : Math.round(((lateCount + earlyCount) / staffCount) * 100)
              }
              color="primary"
              percentage={false}
              positive={false}
            />
            <PieChart
              text="Absent Employees"
              progress={
                isLoading || isError
                  ? 0
                  : Math.round((absentCount / staffCount) * 100)
              }
              color="tomato"
              percentage={false}
            />
            <PieChart
              text="Late Employees"
              progress={
                isLoading || isError || new Date().getHours() < 10
                  ? 0
                  : Math.round((lateCount / staffCount) * 100)
              }
              color="tertiary"
              percentage={false}
            />
          </div>

          <div
            id="hr-attendance"
            className="flex-grow px-2 mt-5"
            style={{ minHeight: '500px' }}
          >
            <Graph />
          </div>
        </div>
        <AVAILABLE_ABSENT_REMOTE data={data} />
      </div>
    </div>
  );
};

export default BottomCardSection;
