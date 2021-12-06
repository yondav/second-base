import React from 'react';
import { Input, FormWrapper } from './formComponents';

const PasswordResetForm = () => {
  return (
    // need to add remaining props to formwrapper and likely implement input render function
    <FormWrapper headerEdit='Update Password'>
      <Input label='New Password' type='password' xs={12} />
      <Input label='Confirm Password' type='confirm_password' xs={12} />
    </FormWrapper>
  );
};

export default PasswordResetForm;
