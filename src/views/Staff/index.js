import React, { useState, useEffect } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import SearchBar from 'components/SearchBar';
import StaffCard from 'components/StaffCard';
import getDailyStaffData from 'g_actions/staffs';
import { useSelector, useDispatch } from 'react-redux';
import StaffChart from './staffChart';
import AddUser from './addUser';
import UserLogs from './userLogs';
import UserAvatarContainer from './userAvatar';
import { PlusSVG } from 'assets/icons';

export const Loading = () => {
  return (
    <div className="flex justify-center items-center bg-white">
      <p className="animate-pulse text-primary">Loading...</p>
    </div>
  );
};

const AllStaff = ({ openSidepanel, setOpenSidePanel }) => {
  const dispatch = useDispatch();
  const { staffCount, staffData, isLoading, isError } = useSelector(
    (state) => state.staff
  );

  useEffect(() => {
    dispatch(getDailyStaffData(staffCount));
  }, [dispatch, staffCount]);

  const { allStaff } = staffData;
  const [filteredData, setFilteredData] = useState(allStaff);

  useEffect(() => {
    setFilteredData(allStaff);
  }, [staffCount, allStaff]);

  return (
    <section
      className="all-staff-container p-3 pt-0 rounded-md flex flex-col m-shadow sticky"
      style={{
        height: 'calc(100vh - 120px)',
        minHeight: '800px',
      }}
    >
      <div className="top-0 bg-white pt-5 px-2 pb-2">
        <div className="flex justify-between">

          <div className="font-thin	text-gray-500 flex justify-between">
           <p className='mr-2'>Employees</p> 
           <PlusSVG
          onClickHandler={() => {
          setOpenSidePanel(!openSidepanel);
         }} />
          </div>

          <div className="text-primary font-semibold">{staffCount}</div>
        </div>

        <div className="my-5">
          <SearchBar
            dataForFilter={allStaff}
            filterHandler={setFilteredData}
            placeholder="Search by staff name"
          />
        </div>
      </div>

      <div className="overflow-y-scroll flex-grow p-1">
        {isLoading && <Loading />}

        {!filteredData.length && isError && <p>Failed to get staffs</p>}

        {!isLoading && filteredData.length
          ? filteredData.map((eachStaff, index) => (
              <StaffCard key={index} data={eachStaff} />
            ))
          : ''}
      </div>
    </section>
  );
};

const StaffDashBoard = () => {
  let { path } = useRouteMatch();
  const [openSidepanel, setOpenSidePanel] = useState(false);
  return (
    <>
      <div
        className="grid w-full mb-10"
        style={{ gridTemplateColumns: '320px auto' }}
      >
        <AllStaff 
        openSidepanel={openSidepanel}
        setOpenSidePanel={setOpenSidePanel}
        />
        <div>
          <AddUser
            openSidepanel={openSidepanel}
            setOpenSidePanel={setOpenSidePanel}
          />
          <div className="flex-grow flex h-full">
            <Switch>
              <Route path={`${path}/:staffEmail`}>
                <div className="px-1 w-80 h-full">
                  <section className="all-staff-container  px-3  rounded-2xl h-full flex flex-col">
                    <div className="mb-4">
                      <UserAvatarContainer />
                    </div>
                    <div className="flex-grow px-1 m-shadow pb-1 overflow-hidden">
                      <UserLogs />
                    </div>
                  </section>
                </div>
                <StaffChart />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffDashBoard;
