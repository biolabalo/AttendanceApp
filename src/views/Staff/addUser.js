import React, {
  useState,
  useEffect
} from 'react';
import { useDispatch } from 'react-redux';
import getDailyStaffData from 'g_actions/staffs';
import Input from 'components/Input';
import SubmitButton from 'components/SubmitButton';
import {
  requests,
  validate
} from 'helpers';
import {useToasts} from 'react-toast-notifications';

const data = [
  {
    name: 'firstName',
    placeHolder: 'First name',
    errorMsg: 'invalid name format',
    valErrorMsg:
      'Please enter your first name',
    required: true,
    type: 'text'
  },
  {
    name: 'lastName',
    placeHolder: 'Last name',
    errorMsg: 'invalid name format',
    valErrorMsg:
      'Please enter your last name',
    required: true,
    type: 'text'
  },
  {
    name: 'email',
    placeHolder: 'Email',
    errorMsg: 'invalid email format',
    valErrorMsg: 'Please enter email',
    required: true,
    type: 'email'
  },
  {
    name: 'designation',
    placeHolder: 'Designation',
    errorMsg: 'invalid name format',
    valErrorMsg:
      'Please enter designation',
    required: true,
    type: 'text'
  },
  {
    name: 'phoneNumber',
    placeHolder: 'Phone',
    errorMsg: 'invalid phone format',
    valErrorMsg:
      'Please enter phone number',
    required: true,
    type: 'text'
  }
];

const Close = ({clickHanlder}) => (
  <svg
    className="cursor-pointer"
    onClick={clickHanlder}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.28263 7.0143L13.734 1.56282C14.0887 1.20822 14.0887 0.634887 13.734 0.28029C13.3794 -0.0743058 12.806 -0.0743058 12.4514 0.28029L6.99993 5.73177L1.5486 0.28029C1.19384 -0.0743058 0.62067 -0.0743058 0.266072 0.28029C-0.0886908 0.634887 -0.0886908 1.20822 0.266072 1.56282L5.7174 7.0143L0.266072 12.4658C-0.0886908 12.8204 -0.0886908 13.3937 0.266072 13.7483C0.44279 13.9252 0.675146 14.014 0.907337 14.014C1.13953 14.014 1.37172 13.9252 1.5486 13.7483L6.99993 8.29682L12.4514 13.7483C12.6283 13.9252 12.8605 14.014 13.0927 14.014C13.3249 14.014 13.5571 13.9252 13.734 13.7483C14.0887 13.3937 14.0887 12.8204 13.734 12.4658L8.28263 7.0143Z"
      fill="#C0C0C0"
    />
  </svg>
);

const AddUser = ({
  openSidepanel,
  setOpenSidePanel
}) => {
  const {addToast} = useToasts();
  const dispatch = useDispatch();

  const [
    staffData,
    setStaffData
  ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    designation: '',
    phoneNumber: ''
  });
  const [
    btnDisabled,
    setBtnDisabled
  ] = useState(true);

  const [
    loading,
    setIsLoading
  ] = useState(false);

  const {
    firstName,
    lastName,
    email,
    designation,
    phoneNumber
  } = staffData;

  function isPhoneValid(phone) {
    let onlyNumbers = phone.replace(
      /[^0-9]/g,
      ''
    );
    if (onlyNumbers.length !== 11)
      return false;
    return true;
  }

  useEffect(() => {

    if (
      validate(firstName, 'firstName') &&
      validate(lastName, 'lastName') &&
      validate(email, 'email') &&
      validate(
        designation,
        'designation'
      ) &&
      isPhoneValid(phoneNumber)
    ) {
      return setBtnDisabled(false);
    }
    setBtnDisabled(true);
  }, [
    firstName,
    lastName,
    email,
    designation,
    phoneNumber
  ]);

  const handleChange = (e) => {
    setStaffData({
      ...staffData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const {
        data: {
          user: {fullName}
        }
      } = await requests.post(
        '/user/create_user',
        staffData
      );

      setIsLoading(false);

      setStaffData({
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
        phoneNumber: ''
      })
      dispatch(getDailyStaffData(0));
      return addToast(
        `${fullName} created`,
        {
          appearance: 'success',
          autoDismiss: true
        }
      );
      
    } catch (err) {
      setIsLoading(false)
      if (err.response?.data?.error) {
        return addToast(
          err.response?.data?.error,
          {
            appearance: 'error',
            autoDismiss: true
          }
        );
      }

      return addToast(
        'Failed to create staff try again',
        {
          appearance: 'error',
          autoDismiss: true
        }
      );
    }
  };

  return (
    <aside
      className={`right_nav_panel z-50 flex-col j-start ${
        openSidepanel ? 'open' : ''
      }`}
      //   onBlur={()=> setOpenSidePanel(false)}
      tabIndex="-1"
    >
      <div className="as_nav flex-row mt-5 j-start">
        <div className="flex justify-between">
          Add A New Staff
          <Close
            clickHanlder={() =>
              setOpenSidePanel(
                !openSidepanel
              )
            }
          />
        </div>

        <div className="my-8">
          {data.map((form, i) => (
            <Input
              usage="sidebar"
              key={`add_user_form_${i}`}
              name={form.name}
              value={
                staffData[form.name]
              }
              type={form.type}
              placeHolder={
                form.placeHolder
              }
              errorMsg={form.errorMsg}
              required={form.required}
              inputValidate={false}
              handleChange={
                handleChange
              }
              valErrorMsg={
                form.valErrorMsg
              }
              attr={form.attr}
              open={true}
              example={form.example}
            />
          ))}

          <SubmitButton
            disabled={btnDisabled}
            handleSubmit={handleSubmit}
            loading={loading}
            text="submit"
          />
        </div>
      </div>
    </aside>
  );
};

export default AddUser;
