import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

//Old registration component, currently not in use.

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
