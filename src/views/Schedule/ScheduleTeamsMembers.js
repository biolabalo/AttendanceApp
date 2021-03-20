import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSchedule, addSchedule } from 'g_actions/teams';
import { useToasts } from 'react-toast-notifications';
import Close from 'assets/icons/close';
import Calender from 'components/Calender';
import UserCard from './userCard';
import Select from 'components/Select';
import SubmitButton from 'components/SubmitButton';
import { axiosInstance } from 'helpers';

const ScheduleTeams = ({ currentUser, close }) => {
  const events = useSelector((state) => state.events);
  const { users } = useSelector((state) => state.teams);
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [submitting, setSubmitting] = useState();
  const [type, seTtypes] = useState('remote');
  const dispatch = useDispatch();
  const usersSchedule = users.find(
    (s_user) => s_user.email === currentUser.email
  ).schedule;
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();
  const user = users.find((s_users) => s_users.email === currentUser.email);

  useEffect(() => {
    if (!user) {
      close();
    }
    if (!month?.toString() || !year) return;

    const getSchedule = async () => {
      await dispatch(getUserSchedule(user, month + 1, year));
      setLoading(false);
    };

    if (loading) {
      getSchedule();
    }
  }, [loading, dispatch, month, year, user, close]);

  const setGMonth = (month) => {
    setMonth(month);
    setLoading(true);
  };

  const setGYear = (year) => {
    setYear(year);
    setLoading(true);
  };

  const eventObj =
    events?.reduce((acc, cur) => {
      if (cur.type === 'event') {
        return { ...acc, [cur.date]: cur };
      }
      return acc;
    }, {}) || {};

  const holidayObj =
    events?.reduce((acc, cur) => {
      if (cur.type === 'holiday') {
        return { ...acc, [cur.date]: cur };
      }
      return acc;
    }, {}) || {};

  const leaveObj =
    usersSchedule?.reduce((acc, cur) => {
      if (cur.type === 'leave') {
        return { ...acc, [cur.date]: cur };
      }
      return acc;
    }, {}) || {};

  const remoteObj =
    usersSchedule?.reduce((acc, cur) => {
      if (cur.type === 'remote') {
        return { ...acc, [cur.date]: cur };
      }
      return acc;
    }, {}) || {};

  const addUserSchedule = (date) => {
    dispatch(addSchedule(user.email, date, type));
  };

  const setType = (e) => {
    seTtypes(e.target.value);
  };

  const updateUserSchedule = async () => {
    setSubmitting(true);

    try {
      await axiosInstance.post('/schedule/create_schedule', {
        email: user.email,
        dates: usersSchedule.map((schedule) => schedule.date),
        type,
        month: month + 1,
        year,
      });

      addToast(
        `${user.firstName}'s days ${type} has been updated successfully`,
        {
          appearance: 'success',
          autoDismiss: true,
        }
      );

      setSubmitting(false);
    } catch (err) {
      addToast('An Error occured please try again', {
        appearance: 'error',
        autoDismiss: true,
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="sm-shadow min-w-sm h-full p-5 ml-10 flex flex-col">
      <nav className="text-txt mb-4 flex justify-between items-center">
        <h2 className="capitalize font-semibold">Team Members</h2>

        <button onClick={close}>
          <Close className="w-4 h-4 fill-current text-txt-lit" />
        </button>
      </nav>

      <div className="flex flex-grow flex-col">
        <div>
          <UserCard user={user} setTeamLead key={`team_lead_${user.email}`} />
        </div>

        <Select
          placeHolder="Choose Type"
          inputs={[
            { name: 'Leave', value: 'leave' },
            { name: 'Remote', value: 'remote' },
          ]}
          handleSelect={setType}
          value={type}
        />

        <p
          className={`text-sm text-txt mb-3 ${
            loading ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Loading user data...
        </p>

        <div className="flex flex-col justify-between flex-grow">
          <Calender
            key={`calender_${user.email}`}
            events={eventObj}
            holidays={holidayObj}
            leave={type === 'leave' ? leaveObj : {}}
            remote={type === 'remote' ? remoteObj : {}}
            setTMonth={setGMonth}
            setTYear={setGYear}
            addSchedule={addUserSchedule}
            type={type}
            loading={loading}
          />

          <SubmitButton
            text="Update"
            loading={submitting}
            handleSubmit={updateUserSchedule}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleTeams;
