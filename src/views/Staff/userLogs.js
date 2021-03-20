import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requests } from 'helpers';
import { CheckInSVG, CheckOutSVG } from 'assets/icons';
import { Loading } from './index';
const UserLogs = () => {
  const { staffEmail } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      try {
        const { data } = await requests.get(
          `/user/daily_user_log?email=${staffEmail}`
        );
        const { dailyUserLogs } = data;

        setLogs(dailyUserLogs);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [staffEmail]);

  return (
    <div
      className="flex flex-col p-4 staff-cards-bs h-full overflow-hidden"
      // style={{ minHeight: '500px' }}
    >
      <div className="text-txt mb-5"> Daily Activity Log</div>
      {!staffEmail && <p>No Staff Email</p>}

      {isLoading && <Loading />}

      {!logs.length && isError && <p>Failed to fetch user logs</p>}

      {!logs.length && !isError && !isLoading ? (
        <small>No records yet !</small>
      ) : (
        ''
      )}

      <div className="flex flex-grow flex-col overflow-y-scroll">
        {!isLoading && (
          <>
            {logs.map(({ type, work_date, log_time }, index) => (
              <div
                key={index}
                className="border-b-2 border-fuchsia-600 text-txt-lit flex items-center text-center justify-between py-1"
              >
                <span className="text-sm">{work_date}</span>
                <span className="text-sm">{log_time}</span>
                {type === 'I' ? (
                  <CheckInSVG className="h-5 w-5 text-xs" />
                ) : (
                  <CheckOutSVG className="h-5 w-5 text-xs" />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default UserLogs;
