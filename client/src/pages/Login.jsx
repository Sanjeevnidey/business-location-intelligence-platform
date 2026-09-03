import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  return <div className="auth-page"><div className="auth-card"><div className="brand center"><span className="brand-mark">G</span><span>GeoBiz</span></div><h1>Welcome back</h1><p className="muted center-text">Sign in to your location workspace.</p><form onSubmit={e=>{e.preventDefault();navigate('/dashboard')}}><label>Email<input type="email" placeholder="you@company.com" required /></label><label>Password<input type="password" placeholder="••••••••" required /></label><button className="button primary full">Sign in</button></form><p className="center-text small">New here? <Link to="/register">Create an account</Link></p></div></div>
}