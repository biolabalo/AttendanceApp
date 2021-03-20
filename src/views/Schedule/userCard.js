import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { removeUserFromTeam, assignTeamLead } from 'g_actions/teams';
import user_icon from 'assets/images/user_icon.png';
import Toggle from 'components/Toogle';
import loader from 'assets/images/loader.gif';
import Delete from 'assets/icons/delete';
import { axiosInstance } from 'helpers';

const UserCard = ({
  user,
  addUser,
  setTeamLead,
  userMap,
  deleteUser,
  onClick,
}) => {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState();
  const [loading, setLoading] = useState();
  const { addToast } = useToasts();

  const deleteTeamMember = async (e) => {
    e.preventDefault();
    setDeleting(true);
    try {
      await dispatch(removeUserFromTeam(user.department, user));
      addToast(`${user.firstName}'s has been removed`, {
        appearance: 'success',
        autoDismiss: true,
      });
      setDeleting(false);
    } catch (err) {
      setDeleting(false);
      addToast(`An Error occured`, {
        appearance: 'success',
        autoDismiss: true,
      });
    }
  };

  const handle_error = (e) => {
    e.target.src = user_icon;
  };

  const move = () => {
    if (!deleteUser) return;
    onClick(user);
  };

  const makeTeamLead = async () => {
    dispatch(assignTeamLead(user.email));
    setLoading(true);

    try {
      await axiosInstance.post('/teams/assign_lead', { email: user.email });
      setLoading(false);
    } catch (err) {
      addToast('An Error Occured', {
        appearance: 'error',
        autoDismiss: true,
      });
      dispatch(assignTeamLead(user.email));
      setLoading(false);
    }
  };

  return (
    <li
      className="mb-3 rounded-md overflow-hidden h-14 relative shadow-green cursor-pointer team-members-card list-none"
      onClick={move}
    >
      <div className="flex h-full w-full">
        <div className="w-14 font-bold text-2xl shadow mr-3">
          <img
            src={user.profilePic || user_icon}
            alt={user.fullName}
            className="object-cover block w-full h-full"
            onError={handle_error}
          />
        </div>
        <div className="flex-grow flex flex-col justify-between p-1 text-sm text-txt relative">
          <p className="font-semibold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-primary text-xs">{user.department}</p>
          {setTeamLead && (
            <div className="absolute toggle-sec bottom-1 right-1 bg-white inline-flex">
              {loading && (
                <div className="relative w-8 h-auto">
                  <img
                    src={loader}
                    alt="loading"
                    className="w-full h-full object-cover absolute top-0"
                  />
                </div>
              )}
              <p className="mr-2 text-xs">Team Lead</p>
              <Toggle
                value={user.role === 'team_lead'}
                onChange={makeTeamLead}
              />
            </div>
          )}
        </div>
        {addUser && (
          <div className="bg-fade w-20 flex-center font-bold text-2xl shadow">
            <input
              id={user.email}
              type="checkbox"
              className="check-input hidden"
              onChange={() => addUser(user)}
              // value={userMap[user.mail]}
              checked={!!userMap[user.email]}
            />
            <label
              htmlFor={user.email}
              className="w-5 h-5 border-2 border-primary rounded-full relative create-team-label cursor-pointer"
            ></label>{' '}
          </div>
        )}

        {deleteUser && (
          <div className="flex flex-col items-end">
            <div className="bg-white p-2 top-1 right-1 flex icon-sec transition-all duration-200 items-start">
              <span className="cursor-pointer" onClick={deleteTeamMember}>
                <Delete className="w-4 h-4" />
              </span>

              {deleting && (
                <div className="relative w-8 h-8">
                  <img
                    src={loader}
                    alt="loading"
                    className="w-full h-full object-cover absolute -top-2"
                  />
                </div>
              )}
            </div>

            {user.role === 'team_lead' && (
              <p className="font-semibold text-xs whitespace-nowrap pr-2 text-primary">
                TL
              </p>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

export default UserCard;
