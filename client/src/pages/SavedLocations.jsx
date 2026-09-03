import React from 'react';

import { Link } from 'react-router-dom';
export default function SavedLocations(){
 const items=[['Vellore Central','Restaurant','82','2 km'],['Chennai OMR','Retail Store','71','5 km'],['Bengaluru Whitefield','Gym','84','2 km'],['Katpadi Junction','Cafe','76','1 km']];
 return <div><div className="page-heading"><div><div className="eyebrow">SAVED</div><h1>Saved locations</h1><p>Shortlisted areas you may want to revisit.</p></div><Link to="/search" className="button primary">+ New analysis</Link></div><div className="saved-grid">{items.map(x=><div className="panel saved-card" key={x[0]}><div className="saved-top"><span className="location-symbol">⌖</span><span className="score-badge">{x[2]}</span></div><h2>{x[0]}</h2><p>{x[1]} · {x[3]}</p><div className="saved-actions"><Link to="/analysis">Open analysis</Link><button onClick={()=>alert('Removed in demo mode.')}>Remove</button></div></div>)}</div></div>
}