import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

//This is our landing page accessible by anyone. There is no register option, only the option to login, admins will register new users after logging in.

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();
  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container" style={{textAlign: 'center'}}>
      <h2>{heading}</h2>
      <div>
        <div style={{textAlign: 'center'}}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
