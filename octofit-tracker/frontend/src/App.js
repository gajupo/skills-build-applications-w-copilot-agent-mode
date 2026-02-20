import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img 
                src="/octofitapp-logo.png" 
                alt="OctoFit Logo" 
                className="navbar-logo"
              />
              <span className="navbar-brand-text">OctoFit Tracker</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    🏊 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    🏃 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="content-container">
      <div className="container">
        <div className="home-hero">
          <h1>Welcome to OctoFit Tracker</h1>
          <p className="lead">Your personal fitness tracking application</p>
          <p>Use the navigation menu above to explore users, teams, activities, workouts, and leaderboards.</p>
        </div>

        <div className="home-features">
          <div className="feature-card">
            <h5>👥 Manage Users</h5>
            <p>View and manage all users in the system with detailed profiles and information.</p>
          </div>
          <div className="feature-card">
            <h5>🏊 Create Teams</h5>
            <p>Build and organize teams to collaborate and compete with other fitness enthusiasts.</p>
          </div>
          <div className="feature-card">
            <h5>🏃 Log Activities</h5>
            <p>Track your daily activities, workouts, and fitness progress in real-time.</p>
          </div>
          <div className="feature-card">
            <h5>💪 View Workouts</h5>
            <p>Explore personalized workout suggestions and fitness routines tailored to you.</p>
          </div>
          <div className="feature-card">
            <h5>🏆 Compete</h5>
            <p>Check out the leaderboard and see how you rank against other team members.</p>
          </div>
          <div className="feature-card">
            <h5>📊 Track Progress</h5>
            <p>Monitor your fitness journey with comprehensive tracking and analytics.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
