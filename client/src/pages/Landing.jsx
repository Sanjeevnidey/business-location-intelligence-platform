import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="brand"><span className="brand-mark">G</span><span>GeoBiz Intelligence</span></div>
        <div className="landing-actions"><Link to="/login" className="text-link">Sign in</Link><Link to="/register" className="button primary">Create account</Link></div>
      </nav>
      <section className="hero">
        <div className="hero-copy">
          <div className="pill">CLOUD-BASED LOCATION ANALYTICS</div>
          <h1>Choose your next business location with <span>evidence.</span></h1>
          <p>Explore nearby businesses and facilities, compare candidate areas, and turn geographic data into a clear expansion decision.</p>
          <div className="hero-actions"><Link to="/register" className="button primary large">Start analyzing →</Link><a href="#how" className="button secondary large">See how it works</a></div>
          <div className="trust-row"><span>✓ Public geographic data</span><span>✓ Transparent scoring</span><span>✓ No AI/ML required</span></div>
        </div>
        <div className="hero-card">
          <div className="mini-top"><span>LOCATION SNAPSHOT</span><span className="live-dot">● Live analysis</span></div>
          <div className="mini-map"><div className="map-grid"></div><span className="pin p1">●</span><span className="pin p2">●</span><span className="pin p3">●</span><span className="pin p4">●</span><span className="center-pin">◎</span></div>
          <div className="mini-stats"><div><b>78</b><span>Location score</span></div><div><b>18</b><span>Competitors</span></div><div><b>8</b><span>Schools</span></div></div>
        </div>
      </section>
      <section id="how" className="feature-strip">
        <div><b>01</b><h3>Collect</h3><p>Fetch geographic data from public sources.</p></div>
        <div><b>02</b><h3>Store</h3><p>Keep analysis data in a cloud database.</p></div>
        <div><b>03</b><h3>Analyze</h3><p>Calculate transparent business metrics.</p></div>
        <div><b>04</b><h3>Decide</h3><p>Compare locations on one dashboard.</p></div>
      </section>
    </div>
  );
}