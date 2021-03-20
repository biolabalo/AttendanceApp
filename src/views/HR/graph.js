import React, {
  useState,
  useEffect
} from 'react';
import {useParams} from 'react-router-dom';
import {
  requests,
  getMonthFromString
} from 'helpers';
import LineChart from 'components/LineChart';

const Graph = () => {
  const {staffEmail} = useParams();
  const [
    isLoading,
    setIsLoading
  ] = useState(true);
  const [
    isError,
    setIsError
  ] = useState(false);
  const [
    graph_Data,
    setGraphData
  ] = useState([]);
  const [
    year,
    setOfficeYear
  ] = useState(
    new Date().getFullYear()
  );
  const [
    month,
    setStaffMonth
  ] = useState(
    new Date().getMonth() + 1
  );
  const [
    useWeek,
    setWeek
  ] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      try {
        const {
          data
        } = await requests.get(
          useWeek
            ? `/dashboard/get_stats?week=true`
            : `/dashboard/get_stats?year=${year}&month=${month}`
        );

        const {graphData} = data;
        setGraphData(graphData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [
    staffEmail,
    month,
    year,
    useWeek
  ]);

  return (
    <LineChart
      data={
        isError || isLoading
          ? []
          : graph_Data
      }
      loading={isLoading}
      setMonth={(data) => {
        setStaffMonth(
          getMonthFromString(data)
        );
      }}
      setYear={(data) => {
        return setOfficeYear(data);
      }}
      setFilterType={(data) => {
        if (data === 'monthly')
          return setWeek(false);
        if (data === 'week')
          return setWeek(true);
      }}
    />
  );
};

export default Graph;
  