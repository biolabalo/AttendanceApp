import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import Loader from 'components/Spinner';
import moment from 'moment';
import Select from '../Select';
import './style.scss';

const weekdayshort = moment.weekdaysShort();

const Calender = ({
  events,
  holidays,
  setTMonth,
  setTYear,
  leave,
  remote,
  addSchedule,
  type,
  loading,
}) => {
  const [dateObject, setDateObj] = useState(moment());
  const [allmonths] = useState(moment.months());
  const { addToast } = useToasts();

  const firstDayOfMonth = () => {
    return moment(dateObject).startOf('month').format('d');
  };

  const currentMonth = allmonths.indexOf(month());
  const currentYear = year();

  useEffect(() => {
    setTMonth(currentMonth);
    setTYear(currentYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let weekdayshortname = weekdayshort.map((day) => {
    return (
      <th key={day} className="week-day">
        <span className="flex-row mx-auto text-primary">{day}</span>
      </th>
    );
  });

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(
      <td className="calendar-day empty" key={`calender_empty_${i}`}>
        <span className="flex-row mx-auto">
          <p>{''}</p>
        </span>
      </td>
    );
  }

  let today = () => {
    return dateObject.format('D');
  };

  const formatNum = (val) => {
    return `${val >= 10 ? val : `0${val}`}`;
  };

  let daysInMonth = [];
  let classes = [...blanks];

  for (let d = 1; d <= dateObject.daysInMonth(); d++) {
    const currentDay =
      d === Number(today()) &&
      allmonths[new Date().getMonth()] === dateObject.format('MMMM') &&
      new Date().getFullYear().toString() === dateObject.format('Y')
        ? 'today'
        : '';

    const currentDate = `${currentYear}-${formatNum(
      currentMonth + 1
    )}-${formatNum(d)}`;

    const event = events[currentDate];
    const remoteDay = remote[currentDate];
    const leaveDay = leave[currentDate];
    const holiday = holidays[currentDate];

    const schdeuleEvent = () => {
      if ((event || holiday) && type === 'remote') {
        return addToast('Can not schedule during an event', {
          appearance: 'error',
          autoDismiss: true,
        });
      }

      addSchedule(currentDate);
    };

    classes.push(
      `calendar-day ${currentDay}${event ? ' event sh' : ''}${
        remoteDay ? ' remote sh' : ''
      }${leaveDay ? ' leave sh' : ''}${holiday ? ' holiday sh' : ''}`
    );

    daysInMonth.push(
      <td key={d} className="relative" onClick={schdeuleEvent}>
        <span className="inline-flex flex-center mx-auto w-6 h-6 rounded-full">
          <p className="text-xs">{d}</p>
        </span>
        {holiday || event ? (
          <div className="toolTip flex-row bg-primary p-2.5">
            <p>
              <strong>
                {holidays[currentDate] && holidays[currentDate].title}
                {events[currentDate] && events[currentDate]?.title}
              </strong>
            </p>
          </div>
        ) : (
          ''
        )}
      </td>
    );
  }

  var totalSlots = [...blanks, ...daysInMonth];
  let rows = [];
  let cells = [];

  let el;
  totalSlots.forEach((row, i) => {
    if ((i % 7) / 3 < 1) {
      el = React.cloneElement(row, { className: `left ${classes[i]}` });
    } else {
      el = React.cloneElement(row, { className: `right ${classes[i]}` });
    }

    if (i % 7 !== 0) {
      cells.push(el); // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells); // when reach next week we contain all td in last week to rows
      cells = []; // empty container
      cells.push(el); // in current loop we still push current row to new container
    }
    if (i === totalSlots.length - 1) {
      // when end loop we add remain date
      rows.push(cells);
    }
  });

  let daysinmonth = rows.map((d, i) => {
    return (
      <tr
        key={`days_in_months_${i} relative`}
        className="px-2 py-3 text-sm text-txt cursor-pointer"
      >
        {d}
      </tr>
    );
  });

  function month() {
    return dateObject.format('MMMM');
  }

  function setMonth(e) {
    // let monthNo = e.target.value; // get month number
    let monthNo = e.target.value; // get month number
    let newdateObject = Object.assign({}, dateObject);
    newdateObject = moment(newdateObject).set('month', monthNo); // change month value
    setDateObj(newdateObject);
    setTMonth(e.target.value);
  }

  function year() {
    return dateObject.format('Y');
  }

  function getDates(startDate, stopDate) {
    let dateArray = [];
    let currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('YYYY'));
      currentDate = moment(currentDate).add(1, 'year');
    }

    return dateArray.map((date) => ({
      name: date,
      value: date,
    }));
  }

  function getMonths() {
    return moment.months().map((mn, i) => ({ name: mn, value: i }));
  }

  const setYear = (e) => {
    const year = e.target.value;
    let newdateObject = Object.assign({}, dateObject);
    newdateObject = moment(newdateObject).set('year', year);
    setDateObj(newdateObject);
    setTYear(e.target.value);
  };

  return (
    <div className="r_calenx">
      <nav className="flex justify-end">
        <Select
          placeHolder="Year"
          inputs={getDates('2021', (new Date().getFullYear() + 2).toString())}
          handleSelect={setYear}
          value={year()}
        />

        <Select
          placeHolder="Month"
          inputs={getMonths()}
          handleSelect={setMonth}
          value={allmonths.indexOf(month())}
        />
      </nav>
      <div
        className={`calendar flex-center flex-col sm-shadow rounded-md relative${
          loading ? ' pointer-events-none cursor-not-allowed' : ''
        }`}
      >
        <table className="calender-body block w-full p-3">
          <thead className="block">
            <tr>{weekdayshortname}</tr>
          </thead>
          <tbody className="block w-full">{daysinmonth}</tbody>
        </table>

        {loading && (
          <div
            className="absolute w-full h-full flex-center rounded-md"
            style={{ background: 'rgba(0,0,0, 0.1)' }}
          >
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Calender;
