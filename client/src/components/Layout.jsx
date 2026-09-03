import React from 'react';

import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const links = [
  ['Dashboard', '/dashboard'],
  ['Analyze', '/search'],
  ['Compare', '/compare'],
  ['Saved', '/saved'],
];

export default function Layout() {
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand" onClick={() => navigate('/dashboard')}>
          <span className="brand-mark">G</span>
          <span>GeoBiz</span>
        </div>
        <div className="sidebar-label">WORKSPACE</div>
        <nav>
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <span>{label === 'Dashboard' ? '▦' : label === 'Analyze' ? '⌖' : label === 'Compare' ? '⇄' : '☆'}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <NavLink to="/profile" className="nav-link">⚙ Profile</NavLink>
          <button className="logout-link" onClick={() => navigate('/')}>↪ Sign out</button>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div>
            <div className="eyebrow">LOCATION INTELLIGENCE</div>
            <div className="top-title">Business expansion workspace</div>
          </div>
          <button className="avatar" onClick={() => navigate('/profile')}>JD</button>
        </header>
        <div className="page-content"><Outlet /></div>
      </main>
    </div>
  );
}