import React, { useState } from 'react';
import './App.css';
import PrivateRoutes from './containers/PrivateRoutes';
import LocalStorageService from './services/localStorage.js';

function App() {
  const [role, setRole] = useState(LocalStorageService.getRole());

  return (
    <PrivateRoutes role={role} setRole={setRole} />
  )
}

export default App;
