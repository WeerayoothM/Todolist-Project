import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Todo from './pages/Todo';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Todo} />
      <Route path="/login" component={Login} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}

export default App;
