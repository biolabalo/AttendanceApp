import React, { useRef, useState } from 'react';
import Input from 'components/Input';
import Select from 'components/Select';
import { useToasts } from 'react-toast-notifications';
import { updateUserTeam, sortTeam } from 'g_actions/teams';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from 'helpers';
import useInput from 'hooks/useInput';
import SubmitButton from 'components/SubmitButton';
import UserCard from './userCard';

const TeamMembers = ({ close }) => {
  const state = useSelector((state) => state.teams);
  const [added, setAdded] = useState([]);
  const [type, setType] = useState([]);
  const submitButton = useRef();
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const [
    handleSubmit,
    // handleChange,
    inputTypes,
    validateSelf,
    setValidateSelf,
    setInputTypes,
    loading_data,
    setLoading,
  ] = useInput({
    inputs: [{ name: 'name' }, { name: 'department' }],
    submitButton,
    cb: async (inputs) => {
      if (added.length === 0) {
        addToast('Please choose members', {
          appearance: 'error',
          autoDismiss: true,
        });
        setLoading(false);
        return;
      }

      const response = await axiosInstance.post('/teams/add', {
        name: inputs.name || inputs.department,
        users: added,
      });

      dispatch(
        updateUserTeam({
          name: inputs.name || inputs.department,
          users: added.reduce((acc, cur) => ({ ...acc, [cur]: true }), {}),
        })
      );

      addToast(response.data.message, {
        appearance: 'success',
        autoDismiss: true,
      });

      close();
    },
  });

  const addUser = (user) => {
    const userExixt = added.find((email) => user.email === email);

    if (userExixt) {
      setAdded((e) => e.filter((email) => email !== user.email));

      return;
    }

    setAdded([...added, user.email]);
  };

  const teams = state.teams.map((team) => ({
    name: team.code,
    value: team.code,
  }));

  const handleSelect = (e) => {
    setAdded([
      ...state.users.reduce(
        (acc, cur) =>
          cur.department === e.target.value ? [...acc, cur.email] : acc,
        []
      ),
    ]);
    setInputTypes({ department: e.target.value, name: '' });
    dispatch(sortTeam(state.users, e.target.value));
  };

  const addedUserMap = added.reduce(
    (acc, cur) => ({ ...acc, [cur]: true }),
    {}
  );

  const handleInputChange = (e) => {
    setAdded([]);
    setInputTypes({ name: e.target.value, department: '' });
  };

  const choosetype = (e) => {
    setType(e.target.value);

    setInputTypes({ department: '', name: '' });
    setAdded([]);
  };

  return (
    <div className="flex-grow flex min-h-0">
      <form className="flex-grow flex flex-col">
        <Select
          placeHolder="Choose Mode"
          inputs={[
            { name: 'Edit Team', value: 'edit' },
            { name: 'Create Team', value: 'create' },
          ]}
          value={type}
          handleSelect={choosetype}
        />

        {type === 'create' && (
          <Input
            placeHolder="Team Name"
            name="name"
            errorMsg="invalid email format"
            valErrorMsg="Please valid name"
            handleChange={handleInputChange}
            value={inputTypes.name}
            validateSelf={validateSelf}
            setValidateSelf={setValidateSelf}
            required={true}
          />
        )}

        {type === 'edit' && (
          <Select
            placeHolder="Choose Team"
            inputs={teams}
            handleSelect={handleSelect}
            value={inputTypes.department}
          />
        )}

        <h4 className="text-txt mb-5">Add Team members</h4>
        <div className="flex-grow flex overflow-scroll p-1">
          <ul>
            {state.users?.map((user, i) => (
              <UserCard
                key={`team_list_${user.email}`}
                user={user}
                addUser={addUser}
                userMap={addedUserMap}
              />
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <SubmitButton
            handleSubmit={handleSubmit}
            btnRef={submitButton}
            text={'Add New Team'}
            loading={loading_data}
          />
        </div>
      </form>
    </div>
  );
};

export default TeamMembers;
