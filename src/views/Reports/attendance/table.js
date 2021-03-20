import React, { useState } from 'react';
import moment from 'moment';
import Loader from 'components/Spinner';
import Select from 'components/Select';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table';
import { CSVLink } from 'react-csv';

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

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className='flex w-80 h-10 rounded-lg search-box-shadow	border-2 border-gray-300 p-1'>
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search`}
        className='h-8 w-full px-2 bg-transparent  outline-none'
      />
      <svg
        width='22'
        height='22'
        viewBox='0 0 22 22'
        fill='none'
        className='pt-2'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M21.3304 19.9594L15.1291 13.7581C16.3053 12.306 17.0133 10.46 17.0133 8.45004C17.0133 3.79071 13.2226 0 8.56328 0C3.90395 0 0.113281 3.79071 0.113281 8.45004C0.113281 13.1094 3.904 16.9001 8.56333 16.9001C10.5732 16.9001 12.4193 16.192 13.8714 15.0159L20.0726 21.2172C20.2464 21.3908 20.5279 21.3908 20.7016 21.2172L21.3304 20.5883C21.5041 20.4146 21.5041 20.133 21.3304 19.9594ZM8.56333 15.1211C4.88469 15.1211 1.89225 12.1287 1.89225 8.45004C1.89225 4.7714 4.88469 1.77897 8.56333 1.77897C12.242 1.77897 15.2344 4.7714 15.2344 8.45004C15.2344 12.1287 12.242 15.1211 8.56333 15.1211Z'
          fill='#C0C0C0'
        />
      </svg>
    </div>
  );
}

function Table({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  loading,
}) {
  // Render the UI for your table
  return (
    <div className='table-scroll'>
      {loading ? (
        <Loader />
      ) : (
        <table
          className='table-auto w-full report-table p-5'
          {...getTableProps()}
        >
          <thead className=''>
            {headerGroups.map((headerGroup) => (
              <tr className='p-15' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className='p-3 sticky top-0 px-5 text-left'
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <>
                            {column.render('Header')}
                            <svg
                              width='12'
                              height='12'
                              viewBox='0 0 12 12'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                              className='inline-block ml-1'
                            >
                              <path
                                d='M8.60124 12C8.34233 12 8.13249 11.7902 8.13249 11.5312V4.12482H6.11705C5.74726 4.12482 5.41639 3.90372 5.27403 3.56149C5.13111 3.2179 5.20811 2.82559 5.47013 2.56192L7.60514 0.414276C7.87074 0.147125 8.2245 0 8.60124 0C8.97798 0 9.33174 0.147125 9.59733 0.414276L11.7323 2.56192C11.9945 2.8255 12.0715 3.2179 11.9285 3.56149C11.7862 3.90372 11.4552 4.12482 11.0854 4.12482H10.5701C10.3112 4.12482 10.1013 3.91498 10.1013 3.65607C10.1013 3.39716 10.3112 3.18732 10.5701 3.18732H11.0321L8.93247 1.07529C8.84413 0.986481 8.72657 0.9375 8.60124 0.9375C8.47599 0.9375 8.35835 0.986481 8.27 1.07529L6.17042 3.18732H8.13249C8.64949 3.18732 9.06999 3.60791 9.06999 4.12482V11.5312C9.06999 11.7901 8.86015 12 8.60124 12Z'
                                fill='#26A595'
                              />
                            </svg>{' '}
                          </>
                        ) : (
                          <>
                            {column.render('Header')}{' '}
                            <svg
                              width='12'
                              height='12'
                              viewBox='0 0 12 12'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                              className='inline-block ml-1'
                            >
                              <path
                                d='M3.39817 12C3.02143 12 2.66767 11.8529 2.40208 11.5857L0.26707 9.43808C0.0049542 9.17441 -0.0720417 8.7821 0.0709637 8.43851C0.213237 8.09628 0.5442 7.87509 0.913981 7.87509H2.92942V0.46875C2.92942 0.209839 3.13926 0 3.39817 0C3.65708 0 3.86692 0.209839 3.86692 0.46875V7.87518C3.86692 8.39209 3.44633 8.81268 2.92942 8.81268H0.967357L3.06694 10.9247C3.15528 11.0135 3.27293 11.0625 3.39817 11.0625C3.52342 11.0625 3.64106 11.0135 3.72941 10.9247L5.82899 8.81268H5.36701C5.1081 8.81268 4.89826 8.60284 4.89826 8.34393C4.89826 8.08502 5.1081 7.87518 5.36701 7.87518H5.88237C6.25215 7.87518 6.58302 8.09628 6.72538 8.43851C6.8683 8.7821 6.79139 9.1745 6.52928 9.43808L4.39427 11.5857C4.12867 11.8529 3.77491 12 3.39817 12Z'
                                fill='#26A595'
                              />
                            </svg>
                          </>
                        )
                      ) : (
                        <>
                          {column.render('Header')}
                          <svg
                            width='12'
                            height='12'
                            viewBox='0 0 12 12'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='inline-block ml-1'
                          >
                            <path
                              d='M8.60124 12C8.34233 12 8.13249 11.7902 8.13249 11.5312V4.12482H6.11705C5.74726 4.12482 5.41639 3.90372 5.27403 3.56149C5.13111 3.2179 5.20811 2.82559 5.47013 2.56192L7.60514 0.414276C7.87074 0.147125 8.2245 0 8.60124 0C8.97798 0 9.33174 0.147125 9.59733 0.414276L11.7323 2.56192C11.9945 2.8255 12.0715 3.2179 11.9285 3.56149C11.7862 3.90372 11.4552 4.12482 11.0854 4.12482H10.5701C10.3112 4.12482 10.1013 3.91498 10.1013 3.65607C10.1013 3.39716 10.3112 3.18732 10.5701 3.18732H11.0321L8.93247 1.07529C8.84413 0.986481 8.72657 0.9375 8.60124 0.9375C8.47599 0.9375 8.35835 0.986481 8.27 1.07529L6.17042 3.18732H8.13249C8.64949 3.18732 9.06999 3.60791 9.06999 4.12482V11.5312C9.06999 11.7901 8.86015 12 8.60124 12Z'
                              fill='#26A595'
                            />
                            <path
                              d='M3.39817 12C3.02143 12 2.66767 11.8529 2.40208 11.5857L0.26707 9.43808C0.0049542 9.17441 -0.0720417 8.7821 0.0709637 8.43851C0.213237 8.09628 0.5442 7.87509 0.913981 7.87509H2.92942V0.46875C2.92942 0.209839 3.13926 0 3.39817 0C3.65708 0 3.86692 0.209839 3.86692 0.46875V7.87518C3.86692 8.39209 3.44633 8.81268 2.92942 8.81268H0.967357L3.06694 10.9247C3.15528 11.0135 3.27293 11.0625 3.39817 11.0625C3.52342 11.0625 3.64106 11.0135 3.72941 10.9247L5.82899 8.81268H5.36701C5.1081 8.81268 4.89826 8.60284 4.89826 8.34393C4.89826 8.08502 5.1081 7.87518 5.36701 7.87518H5.88237C6.25215 7.87518 6.58302 8.09628 6.72538 8.43851C6.8683 8.7821 6.79139 9.1745 6.52928 9.43808L4.39427 11.5857C4.12867 11.8529 3.77491 12 3.39817 12Z'
                              fill='#26A595'
                            />
                          </svg>
                        </>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className='px-5 py-2 text-left'
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

function App({ data, setYear, setMonth, loading }) {
  const [datedata, setDateData] = useState({
    month: months[currentMonth].value,
    year: new Date().getFullYear(),
  });

  const columns = React.useMemo(
    () => [
      {
        Header: 'Staff ID',
        accessor: 'staffId',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Function',
        accessor: 'function',
      },
      {
        Header: 'Present',
        accessor: 'present',
      },
      {
        Header: 'Number of days Absent',
        accessor: 'absent',
      },
      {
        Header: 'Remote work days',
        accessor: 'remote',
      },
      {
        Header: 'Leave',
        accessor: 'leave',
      },
      // {
      //   Header: 'Download',
      //   accessor: '',
      // },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy
  );

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setDateData({ ...datedata, [name]: value });
    name === 'year' && setYear(value);
    name === 'month' && setMonth(value);
    // setTimeout(function () {
    //   restart();
    // }, 200);
  };

  return (
    <div>
      <div className='flex justify-between items-center pb-5'>
          {/* <Select
            name='events'
            placeHolder='Teams'
            inputs={teams.length ? teams : []}
            // handleSelect={selectHandler}
          /> */}
          {/* Monthly Attendance Reports */}
        {/* <div>
        </div> */}
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />

        <div className='flex'>
          <div className='ml-3'>
            <Select
              inputs={years}
              placeHolder='Select Year'
              value={datedata.year}
              handleSelect={handleDateChange}
              name='year'
              attr={{ style: { minWidth: '120px', marginBottom: 0 } }}
            />
          </div>
          <div className='ml-3'>
            {' '}
            <Select
              inputs={months}
              placeHolder='Select Month'
              value={datedata.month}
              handleSelect={handleDateChange}
              name='month'
              attr={{
                style: {
                  minWidth: '120px',
                  marginBottom: 0,
                },
              }}
            />
          </div>
        </div>

        {data.length ? (
          <CSVLink
            data={data}
            className='w-28 h-12 text-white text-center bg-secondary cursor-pointer pt-3 rounded-lg'
            filename={`monthly-attendance.xls`}
          >
            Export
          </CSVLink>
        ) : null}
      </div>

      <Table
        columns={columns}
        data={data}
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow}
        state={state}
        visibleColumns={visibleColumns}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        loading={loading}
      />
    </div>
  );
}

export default App;
