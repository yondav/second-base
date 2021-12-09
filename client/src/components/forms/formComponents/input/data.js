// profile
export const profileInputs = state => [
  {
    label: 'First Name',
    type: 'text',
    name: 'first_name',
    value: state.first_name,
  },
  {
    label: 'Last Name',
    type: 'text',
    name: 'last_name',
    value: state.last_name,
  },
  {
    label: 'Email',
    type: 'email',
    name: 'email',
    value: state.email,
  },
];

export const passwordInputs = () => [
  { label: 'New Password', type: 'password', name: 'new_password', md: 12 },
  {
    label: 'Confirm Password',
    type: 'password',
    name: 'confirm_password',
    md: 12,
  },
];

// general
export const generalInputs = state => [
  { label: 'Email', type: 'email', name: 'email', value: state.email },
];

export const addressInputs = state => [
  {
    label: 'Street Address',
    type: 'text',
    name: 'address-address',
    value: state.address.address,
  },
  {
    label: 'Neighborhood',
    type: 'text',
    name: 'address-neighborhood',
    value: state.address.neighborhood,
    xs: 6,
    md: 3,
  },
  {
    label: 'City',
    type: 'text',
    name: 'address-city',
    value: state.address.city,
    xs: 6,
    md: 3,
  },
  {
    label: 'State',
    type: 'text',
    name: 'address-state',
    value: state.address.state,
    xs: 6,
    md: 3,
  },
  {
    label: 'Zip Code',
    type: 'number',
    name: 'address-zip_code',
    value: state.address.zip_code,
    xs: 6,
    md: 3,
  },
];

// login
export const loginInputs = state => [
  {
    label: 'Email Address',
    type: 'email',
    name: 'email',
    value: state.email,
    md: 12,
  },
  {
    label: 'Password',
    type: 'password',
    name: 'password',
    value: state.password,
    md: 12,
  },
];
