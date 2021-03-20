import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requests, getMonthFromString } from 'helpers';
import PieChart from 'components/PieChart';
import LineChart from 'components/LineChart';

const StaffChart = () => {
  const { staffEmail } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [staffCharts, setStaffCharts] = useState({
    present: 0,
    leave: 0,
    remote: 0,
    late: 0,
    absent: 0,
  });
  const [graph_Data, setGraphData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setStaffMonth] = useState(new Date().getMonth() + 1);
  const [useWeek, setWeek] = useState(true);

  useEffect(() => {
    if (!staffEmail) return;
    const fetchData = async () => {
      setIsError(false);

      try {
        const { data } = await requests.get(
          `/dashboard/get_stats?year=${year}&email=${staffEmail}&month=${
            new Date().getMonth() + 1
          }`
        );

        const { counts } = data;
        setStaffCharts(counts);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [staffEmail, year]);

  useEffect(() => {
    if (!staffEmail) return;
    const fetchData = async () => {
      setIsError(false);

      try {
        const { data } = await requests.get(
          useWeek
            ? `/dashboard/get_stats?week=${true}&email=${staffEmail}`
            : `/dashboard/get_stats?year=${year}&email=${staffEmail}&month=${month}`
        );
        const { graphData } = data;
        setGraphData(graphData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [staffEmail, month, year, useWeek]);

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex justify-between flex-row">
        <PieChart
          text="Punctual"
          progress={
            isLoading || isError
              ? 0
              : Math.round(
                  (staffCharts?.present /
                    (staffCharts?.absent + staffCharts?.present)) *
                    100
                )
          }
          color="primary"
          percentage={false}
          positive={false}
        />

        <PieChart
          text="Absent"
          progress={
            isLoading || isError
              ? 0
              : Math.round(
                  (staffCharts?.absent /
                    (staffCharts?.absent + staffCharts?.present)) *
                    100
                )
          }
          color="tomato"
          percentage={false}
        />

        <PieChart
          text="Lateness"
          progress={
            isLoading || isError
              ? 0
              : Math.round(
                  (staffCharts?.late /
                    (staffCharts?.absent + staffCharts?.present)) *
                    100
                )
          }
          color="tertiary"
          percentage={false}
        />
      </div>

      <div className="flex-grow mt-10">
        <LineChart
          data={graph_Data}
          loading={isLoading}
          setMonth={(data) => {
            setStaffMonth(getMonthFromString(data));
          }}
          setYear={(data) => {
            return setYear(data);
          }}
          setFilterType={(data) => {
            if (data === 'monthly') return setWeek(false);
            if (data === 'week') return setWeek(true);
          }}
        />
      </div>
    </div>
  );
};

export default StaffChart;
