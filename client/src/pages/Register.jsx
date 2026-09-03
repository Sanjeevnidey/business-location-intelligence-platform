import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
export default function Register() {
  const navigate = useNavigate();
  return <div className="auth-page"><div className="auth-card"><div className="brand center"><span className="brand-mark">G</span><span>GeoBiz</span></div><h1>Create your workspace</h1><p className="muted center-text">Set up your business location analysis account.</p><form onSubmit={e=>{e.preventDefault();navigate('/dashboard')}}><label>Full name<input placeholder="Jane Doe" required /></label><label>Work email<input type="email" placeholder="you@company.com" required /></label><label>Password<input type="password" placeholder="Create a password" required /></label><button className="button primary full">Create account</button></form><p className="center-text small">Already have an account? <Link to="/login">Sign in</Link></p></div></div>
}