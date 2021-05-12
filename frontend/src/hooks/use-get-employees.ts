import { useEffect, useState } from 'react';
import axios from 'axios';

interface Employee {
  id: number;
  name: string;
  role: string;
}

interface GetEmpoyeesState {
  error: Error | null;
  loading: boolean;
  employees: Employee[];
}

const useGetEmployees = (): GetEmpoyeesState => {
  const [state, setState] = useState<GetEmpoyeesState>({
    error: null,
    loading: true,
    employees: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/employees`);
        setState({
          ...state,
          loading: false,
          employees: res.data,
        });
      } catch (error) {
        setState({ ...state, error, loading: false });
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ...state };
};

export default useGetEmployees;
