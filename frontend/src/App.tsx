import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/employees" component={Employees} />
        <Route exact path="/settings" component={Settings} />
        <Route path="*" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
