import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Responses from './pages/Responses';
import Settings from './pages/Settings';
import Logs from './pages/Logs';
import Login from './pages/Login';

// Context
import { AuthProvider } from './context/AuthContext';
import { StatsProvider } from './context/StatsContext';

function App() {
  return (
    <AuthProvider>
      <StatsProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="accounts" element={<Accounts />} />
              <Route path="responses" element={<Responses />} />
              <Route path="logs" element={<Logs />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </StatsProvider>
    </AuthProvider>
  );
}

export default App;
