import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requests } from 'helpers';
import Avatar from 'components/Avatar';

const UserAvatarContainer = () => {
  const { staffEmail } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [staff, setStaff] = useState({});
  const [remote_leave_days, setRemote_leave_days] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      try {
        const { data } = await requests.get(
          `/user/user_avatar_info?email=${staffEmail}`
        );
        const { userDetails, remote_leave_days } = data;
        setStaff(userDetails);
        setRemote_leave_days(remote_leave_days)
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [staffEmail]);

  return (
    <div className="m-shadow">
      {!staffEmail && <p>No Staff Email</p>}

      {isError  && <p>Failed to get staff</p>}

    <Avatar
     type="staff" 
     data={staff[0]}
     remote_leave_days={remote_leave_days} 
     isLoading={isLoading}
     /> 
    </div>
  );
};

export default UserAvatarContainer;
