import React, { useEffect } from 'react';
import getDailyStaffData from 'g_actions/staffs';
import LeftSection from './left';
import BottomCardSection from './bottom';
import TopCardSection from './top';
import { useSelector, useDispatch } from 'react-redux';

function HRDashboard() {
  const dispatch = useDispatch();
  const { staffCount, staffData, isLoading, isError } = useSelector(
    (state) => state.staff
  );

  useEffect(() => {
    dispatch(getDailyStaffData(staffCount));
  }, [dispatch, staffCount]);

  const {
    earlyStaffs,
    absentStaffs,
    lateStaffs,
    remoteStaffs,
    leaveStaffs,
  } = staffData;

  const cardStats = {
    staffCount,
    lateCount: lateStaffs.length,
    remoteCount: remoteStaffs.length,
    leaveCount: leaveStaffs.length,
    absentCount: absentStaffs.length,
    earlyCount: earlyStaffs.length,
  };

  return (
    <div
      className="grid w-full mb-10"
      style={{ gridTemplateColumns: '320px auto' }}
    >
      <div className="h-full">
        <LeftSection
          data={{
            lateStaffs,
            isLoading,
            isError,
          }}
        />
      </div>
      <div className="px-2 flex-grow flex flex-col h-full">
        <TopCardSection
          data={cardStats}
          loadingState={{
            isLoading,
            isError,
          }}
        />
        <BottomCardSection
          data={{
            isLoading,
            isError,
            earlyStaffs,
            absentStaffs,
            lateStaffs,
            remoteStaffs,
            leaveStaffs,
          }}
          cardStats={cardStats}
        />
      </div>
    </div>
  );
}

export default HRDashboard;
