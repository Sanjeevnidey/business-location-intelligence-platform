import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LocationSearch from './pages/LocationSearch';
import Analysis from './pages/Analysis';
import Compare from './pages/Compare';
import SavedLocations from './pages/SavedLocations';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<LocationSearch />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/saved" element={<SavedLocations />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}