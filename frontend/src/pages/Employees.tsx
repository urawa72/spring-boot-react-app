import React from 'react';
import { Link } from 'react-router-dom';
import useGetEmployees from '../hooks/use-get-employees';

const Employees: React.FC = () => {
  const { employees } = useGetEmployees();
  return (
    <>
      <h1>Employees</h1>
      <div style={{ marginBottom: 10 }}>
        {employees.map((employee) => (
          <div key={employee.id}>
            Name: {employee.name} (Role: {employee.role})
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <Link to="/">Back to Home</Link>
      </div>
    </>
  );
};

export default Employees;
