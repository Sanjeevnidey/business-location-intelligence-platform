import React from 'react';

import { Link } from 'react-router-dom';
export default function Compare(){
 const rows=[['Location score','82','74','+8'],['Competitors','18','27','Better'],['Schools','8','5','+3'],['Hospitals','3','2','+1'],['Banks & ATMs','6','9','-3'],['Shops','24','31','-7']];
 return <div><div className="page-heading"><div><div className="eyebrow">COMPARISON</div><h1>Compare candidate locations</h1><p>See the strongest signals side by side.</p></div><Link to="/search" className="button primary">+ Add location</Link></div>
 <div className="panel comparison"><div className="compare-head"><div className="compare-location"><span>A</span><h2>Vellore Central</h2><small>Restaurant · 2 km</small></div><div className="vs">VS</div><div className="compare-location"><span>B</span><h2>Katpadi Junction</h2><small>Restaurant · 2 km</small></div></div>
 <table><thead><tr><th>Metric</th><th>Location A</th><th>Location B</th><th>Difference</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td>{r[2]}</td><td><span className={r[3].includes('-')?'negative':'positive'}>{r[3]}</span></td></tr>)}</tbody></table>
 <div className="winner"><span>Recommended by current scoring model</span><b>Location A · Vellore Central</b><p>Higher overall score and fewer nearby competitors in this demo analysis.</p></div></div></div>
}