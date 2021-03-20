import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useToasts } from 'react-toast-notifications';
import { requests } from 'helpers';
import Table from './table';

const Attendance = () => {
  const { addToast } = useToasts();
  const months = moment
    .months()
    .map((month) => ({ name: month, value: month }));
  const currentMonth = moment().month();
  const [monthlyAttendance, setMonthlyAttendance] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(months[currentMonth].value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      setLoading(true);
      try {
        const response = await requests.get(
          `/attendance?month=${month}&year=${year}`
        );
        // ...
        setLoading(false);
        setMonthlyAttendance(response.data);
      } catch (error) {
        setLoading(false);
        addToast('Failed to get Attendance report', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
    fetchData();
  }, [month, monthlyAttendance.length, year, addToast]); // Or [] if effect doesn't need props or state

  return (
    <div className='table-container p-5 mt-10'>
      <Table
        loading={loading}
        data={monthlyAttendance}
        setMonth={setMonth}
        setYear={setYear}
      />
    </div>
  );
};

export default Attendance;
