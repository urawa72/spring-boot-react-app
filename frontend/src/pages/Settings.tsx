import React from 'react';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
  return (
    <>
      <h1>Settings</h1>
      <div>
        <Link to="/">Back to Home</Link>
      </div>
    </>
  );
};

export default Settings;
