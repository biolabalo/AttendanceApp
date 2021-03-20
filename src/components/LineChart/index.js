import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Loader from 'components/Spinner';
import { position_line } from 'helpers/visuals';
import Select from 'components/Select';

const months = moment.months().map((month) => ({ name: month, value: month }));
const currentMonth = moment().month();
const years = (() => {
  const startYear = 2020;
  const year = new Date().getFullYear();
  return Array.from(new Array(year - startYear), (v, i) => ({
    name: startYear + i + 1,
    value: startYear + i + 1,
  }));
})();

const ChartCard = ({
  className = '',
  children,
  data,
  loading,
  title,
  setMonth,
  setYear,
  setFilterType,
}) => {
  const charts = useRef({});
  const [datedata, setDateData] = useState({
    month: months[currentMonth].value,
    year: new Date().getFullYear(),
    filterType: 'week',
  });

  useEffect(() => {
    if (loading) return;

    if (charts.current['bar']) {
      charts.current['bar'].dispose();
    }

    let dispData = data;

    const sumFunc = (arr, key) =>
      arr.reduce((acc, cur) => {
        return acc + cur[key];
      }, 0);

    if (!data.length) return;

    const totals_data = Object.keys(data[0]).reduce((acc, cur) => {
      if (cur === 'date') return acc;
      return { ...acc, [cur]: sumFunc(data, cur) };
    }, {});

    if (datedata.filterType !== 'week') {
      const daysOfMonth = moment(data[0]?.date || null).daysInMonth();
      const filtereddays = [];

      for (let i = 0; i <= daysOfMonth - 1; i++) {
        const tempdate = moment(data[0]?.date)
          .clone()
          .startOf('month')
          .add(i, 'days')
          .format('YYYY-MM-DD dddd');

        if (
          tempdate.split(' ')[1] !== 'Saturday' &&
          tempdate.split(' ')[1] !== 'Sunday'
        ) {
          filtereddays.push(Number(tempdate.split('-')[2].split(' ')[0]));
        }
      }

      const daysExixting = data.reduce((acc, cur) => {
        return { ...acc, [Number(cur.date.split('-')[2])]: cur };
      }, {});

      let dataDisp = [];

      filtereddays.forEach((day) => {
        dataDisp.push({
          present: 0,
          absent: 0,
          remote: 0,
          ...daysExixting[day],
        });
      });

      dispData = dataDisp;
    }

    charts.current['bar'] = position_line(
      dispData,
      'bar',
      totals_data,
      datedata.filterType
    );
    let barChart = charts.current['bar'];

    return () => {
      barChart.dispose();
    };
  }, [loading, data, datedata.filterType]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setDateData({ ...datedata, [name]: value });
    name === 'year' && setYear(value);
    name === 'month' && setMonth(value);
    name === 'filterType' && setFilterType(value);
    // setTimeout(function () {
    //   restart();
    // }, 200);
  };

  return (
    <div
      className={`chart_card w-full h-full sm-shadow pt-3 flex flex-col items-start relative ${className}`}
    >
      <div className="chart_header h-10 w-full flex justify-between items-center px-6">
        <h2 className="text-txt">Attendance Performance</h2>
        <div className="flex justify-between items-center ">
          <Select
            placeHolder="Filter"
            inputs={[
              { name: 'Weekly', value: 'week' },
              { name: 'Monthly', value: 'monthly' },
            ]}
            handleSelect={handleDateChange}
            attr={{ style: { minWidth: '100px', marginBottom: 0 } }}
            value={datedata.filterType}
            name="filterType"
          />

          {datedata.filterType === 'week' ? (
            <small className="whitespace-nowrap text-txt ml-3">
              Last 7 days
            </small>
          ) : (
            <div className="flex">
              <div className="ml-3">
                <Select
                  inputs={years}
                  placeHolder="Select Year"
                  value={datedata.year}
                  handleSelect={handleDateChange}
                  name="year"
                  attr={{ style: { minWidth: '100px', marginBottom: 0 } }}
                />
              </div>
              <div className="ml-3">
                {' '}
                <Select
                  inputs={months}
                  placeHolder="Select Month"
                  value={datedata.month}
                  handleSelect={handleDateChange}
                  name="month"
                  attr={{
                    style: {
                      minWidth: '100px',
                      marginBottom: 0,
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="chart_sec flex-grow w-full flex flex-col">
        {/* {false ? ( */}
        {!loading ? (
          (Array.isArray(data) && data?.length > 0) || !Array.isArray(data) ? (
            <>
              <div id="bar" key={title} className="flex-grow"></div>
              {children}
            </>
          ) : (
            <div className="flex flex-row w-full h-full">
              <p style={{ color: '#626262' }}>No Data to Display Yet</p>
              <label id="bar" style={{ display: 'none' }}></label>
            </div>
          )
        ) : (
          <div className="w-full h-full flex-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartCard;
