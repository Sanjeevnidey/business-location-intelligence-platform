import React from 'react';

export default function StatCard({label, value, detail, icon}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <div className="muted">{label}</div>
        <div className="stat-value">{value}</div>
        <div className="small">{detail}</div>
      </div>
    </div>
  );
}