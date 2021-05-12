import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <h1>Home</h1>
      <div>
        <Link to="/employees">Employees</Link>
      </div>
      <div>
        <Link to="/settings">Settings</Link>
      </div>
    </>
  );
};

export default Home;
