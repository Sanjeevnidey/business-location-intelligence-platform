import React from 'react';

import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
export default function Dashboard() {
  return <div>
    <div className="page-heading"><div><div className="eyebrow">OVERVIEW</div><h1>Good morning, Jordan.</h1><p>Here's what's happening with your location research.</p></div><Link className="button primary" to="/search">+ New analysis</Link></div>
    <div className="stats-grid"><StatCard label="Analyses completed" value="24" detail="+12% this month" icon="⌁"/><StatCard label="Saved locations" value="8" detail="3 shortlisted" icon="☆"/><StatCard label="Data points" value="12.4K" detail="Across 24 analyses" icon="◈"/><StatCard label="Avg. score" value="76" detail="Out of 100" icon="◎"/></div>
    <div className="two-col">
      <div className="panel"><div className="panel-head"><div><h2>Recent analyses</h2><p>Latest location research</p></div><Link to="/saved">View all</Link></div>
        <table><thead><tr><th>Location</th><th>Business type</th><th>Score</th><th>Date</th></tr></thead><tbody>
          {[['Vellore Central','Restaurant','82','Today'],['Katpadi Junction','Cafe','76','Yesterday'],['Chennai OMR','Retail','71','Aug 30'],['Bengaluru Whitefield','Gym','84','Aug 28']].map(r=><tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td><span className="score-badge">{r[2]}</span></td><td>{r[3]}</td></tr>)}
        </tbody></table>
      </div>
      <div className="panel">
        <div className="panel-head"><div><h2>Scoring model</h2><p>Current weighting</p></div></div>
        <div className="weight"><span>Demand</span><b>30%</b><div className="bar"><i style={{width:'90%'}}/></div></div>
        <div className="weight"><span>Competition</span><b>25%</b><div className="bar"><i style={{width:'68%'}}/></div></div>
        <div className="weight"><span>Facilities</span><b>20%</b><div className="bar"><i style={{width:'80%'}}/></div></div>
        <div className="weight"><span>Accessibility</span><b>15%</b><div className="bar"><i style={{width:'74%'}}/></div></div>
        <div className="weight"><span>Environment</span><b>10%</b><div className="bar"><i style={{width:'70%'}}/></div></div>
      </div>
    </div>
    <div className="callout"><div><b>Ready to evaluate another area?</b><span>Search a city, neighborhood, or candidate address and generate a fresh analysis.</span></div><Link className="button secondary" to="/search">Analyze location →</Link></div>
  </div>
}