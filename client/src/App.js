import './App.css';
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import React, { Suspense } from 'react';
import Auth from './hoc/auth';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import MovieDetail from './components/views/MovieDetail/MovieDetail';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <BrowserRouter>
        <NavBar />
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route exact path="/" element={Auth(LandingPage, null)}/>
            <Route exact path="/login" element={Auth(LoginPage, false)}/>
            <Route exact path="/register" element={Auth(RegisterPage, false)}/>
            <Route exact path="/movie/:movieId" element={Auth(MovieDetail, null)}/>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;