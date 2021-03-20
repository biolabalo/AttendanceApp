import React from 'react';
import Statistics from 'components/Statistics';

const TopCardSection = ({ data, loadingState }) => {
  const { isLoading, isError } = loadingState;
  const { staffCount, absentCount, remoteCount,lateCount, leaveCount, earlyCount } = data;

  return (
    <div className="mb-5">
      <div className="flex justify-between -mx-3.5">
        <Statistics
          text="Employees"
          number={isLoading || isError ? 0 : staffCount}
        />
        <Statistics
          text="Present"
          number={isLoading || isError ? 0 : earlyCount + lateCount}
         
        />
        <Statistics
          text="Absent"
          number={isLoading || isError ? 0 : absentCount}
          // subTitle="This Week"
          // percentage={5}
          textColor="tomato"
        />
        <Statistics
          text="Remote"
          number={isLoading || isError ? 0 : remoteCount}
          textColor="secondary"
        />
        <Statistics
          text="Leave"
          number={isLoading || isError ? 0 : leaveCount}
          subTitle="This Week"
          // percentage={5}
          // textColor="tomato"
        />
      </div>
    </div>
  );
};

export default TopCardSection;
