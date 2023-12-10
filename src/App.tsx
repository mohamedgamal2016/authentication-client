import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import PrivateRoute from './components/core/PrivateRoute';

const App: React.FC = () => {
  return (
  <Router>
    <Routes>
      <Route path="/" Component={SignUp} />
      <Route path='/home' element={<PrivateRoute/>}>
            <Route path='/home' element={<Home/>}/>
      </Route>
      <Route path="/signup" Component={SignUp} />
      <Route path="/login" Component={Login} />
    </Routes>
  </Router>
  );
}

export default App;
