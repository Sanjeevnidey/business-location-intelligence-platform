import React from 'react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function LocationSearch() {
  const [city,setCity]=useState('Vellore');
  const [type,setType]=useState('Restaurant');
  const [radius,setRadius]=useState('2');
  const navigate=useNavigate();
  function submit(e){e.preventDefault(); localStorage.setItem('bliSearch',JSON.stringify({city,type,radius})); navigate('/analysis');}
  return <div><div className="page-heading"><div><div className="eyebrow">NEW ANALYSIS</div><h1>Find a business opportunity</h1><p>Choose what you want to evaluate and where.</p></div></div>
    <div className="search-layout"><form className="panel search-form" onSubmit={submit}>
      <h2>Analysis setup</h2><p className="muted">We'll retrieve nearby geographic data and calculate a transparent score.</p>
      <label>Business type<select value={type} onChange={e=>setType(e.target.value)}>{['Restaurant','Cafe','Retail Store','Pharmacy','Gym','Supermarket'].map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Location<input value={city} onChange={e=>setCity(e.target.value)} placeholder="City or neighborhood" /></label>
      <label>Search radius<select value={radius} onChange={e=>setRadius(e.target.value)}>{['1','2','5','10'].map(x=><option key={x} value={x}>{x} km</option>)}</select></label>
      <button className="button primary full">Generate analysis →</button>
    </form>
    <div className="panel checklist"><h2>What you'll get</h2>{['Competitor density','Nearby schools and hospitals','Banks, shops and services','Interactive map','Transparent location score','Side-by-side comparison'].map((x,i)=><div className="check" key={x}><span>0{i+1}</span><div><b>{x}</b><p>Included in your location report.</p></div></div>)}</div></div>
  </div>
}