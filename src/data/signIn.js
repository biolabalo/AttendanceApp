const data = [
  {
    name: 'email',
    placeHolder: 'Email',
    errorMsg: 'invalid email format',
    valErrorMsg: 'Please enter email',
    required: true,
    attr: { autoComplete: 'current-email' },
    type: 'email',
    example: 'example@domain.com',
  },
  {
    placeHolder: 'Password',
    name: 'password',
    type: 'password',
    required: true,
    valErrorMsg: 'Please enter password',
    errorMsg: '',
    attr: { autoComplete: 'current-password' },
    example: '*********',
  },
];

export default data;
