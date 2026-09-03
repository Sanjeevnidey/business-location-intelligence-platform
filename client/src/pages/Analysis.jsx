import React from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import MapView from '../components/MapView';

const demoMarkers=[
 {id:1,name:'Green Leaf Restaurant',category:'Restaurant',lat:12.921,lng:79.127},
 {id:2,name:'City Cafe',category:'Cafe',lat:12.912,lng:79.142},
 {id:3,name:'Central School',category:'School',lat:12.924,lng:79.136},
 {id:4,name:'Health Plus',category:'Hospital',lat:12.909,lng:79.126},
 {id:5,name:'Metro Bank',category:'Bank',lat:12.917,lng:79.146}
];
const chart=[{name:'Restaurants',count:18},{name:'Schools',count:8},{name:'Hospitals',count:3},{name:'Banks',count:6},{name:'Shops',count:24}];

export default function Analysis(){
 const data=useMemo(()=>JSON.parse(localStorage.getItem('bliSearch')||'{"city":"Vellore","type":"Restaurant","radius":"2"}'),[]);
 return <div><div className="page-heading"><div><div className="eyebrow">ANALYSIS REPORT</div><h1>{data.city} · {data.type}</h1><p>{data.radius} km radius · public geographic data snapshot</p></div><div className="heading-actions"><Link to="/compare" className="button secondary">Compare</Link><button className="button primary" onClick={()=>alert('Analysis saved in demo mode.')}>☆ Save</button></div></div>
 <div className="analysis-grid">
   <div className="panel map-panel"><div className="panel-head"><div><h2>Local business landscape</h2><p>Nearby places by category</p></div><span className="data-chip">● Data snapshot</span></div><MapView markers={demoMarkers}/></div>
   <div className="panel score-panel"><div className="eyebrow">LOCATION SCORE</div><div className="big-score">82<span>/100</span></div><p className="muted">Strong candidate based on the current scoring model.</p><div className="score-row"><span>Demand</span><b>90</b></div><div className="score-row"><span>Competition</span><b>68</b></div><div className="score-row"><span>Facilities</span><b>84</b></div><div className="score-row"><span>Accessibility</span><b>79</b></div><div className="score-row"><span>Environment</span><b>74</b></div></div>
 </div>
 <div className="stats-grid four"><div className="metric"><span>Competitors</span><b>18</b><small>Within {data.radius} km</small></div><div className="metric"><span>Schools</span><b>8</b><small>Potential demand indicator</small></div><div className="metric"><span>Hospitals</span><b>3</b><small>Nearby facilities</small></div><div className="metric"><span>Banks & ATMs</span><b>6</b><small>Commercial activity</small></div></div>
 <div className="two-col"><div className="panel chart-panel"><div className="panel-head"><div><h2>Nearby places</h2><p>Count by category</p></div></div><ResponsiveContainer width="100%" height={260}><BarChart data={chart}><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="count" /></BarChart></ResponsiveContainer></div>
 <div className="panel"><div className="panel-head"><div><h2>Business interpretation</h2><p>Why this score?</p></div></div><div className="insight good"><b>Demand looks strong</b><span>Schools and commercial activity provide positive signals.</span></div><div className="insight"><b>Competition is moderate</b><span>18 similar businesses are visible within the selected radius.</span></div><div className="insight good"><b>Facilities are accessible</b><span>Banks, healthcare and retail services are nearby.</span></div><p className="disclaimer">This score is a transparent decision-support indicator, not a guarantee of business success.</p></div></div>
 </div>
}