import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import MapView from '../components/MapView';
import { analyzeLocation } from '../services/api';

export default function Analysis() {

  const searchData = useMemo(() => {
    return JSON.parse(
      localStorage.getItem('bliSearch') ||
      '{"city":"Vellore","type":"restaurant","radius":"5"}'
    );
  }, []);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    async function loadAnalysis() {
      try {
        setLoading(true);

        const response = await analyzeLocation({
          city: searchData.city,
          type: searchData.type,
          radius: searchData.radius
        });

        setResult(response);

      } catch (err) {
        console.error(err);
        setError('Unable to load location analysis.');

      } finally {
        setLoading(false);
      }
    }

    loadAnalysis();

  }, [searchData]);


  if (loading) {
    return (
      <div className="panel">
        <h2>Analyzing location...</h2>
        <p>Searching for businesses and generating intelligence.</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="panel">
        <h2>Analysis failed</h2>
        <p>{error}</p>
      </div>
    );
  }


  if (!result) return null;


  const {
    location,
    intelligence,
    places,
    categoryInsights
  } = result;


  const chartData = Object.entries(categoryInsights || {}).map(
    ([name, count]) => ({
      name,
      count
    })
  );


  return (
    <div>

      <div className="page-heading">

        <div>
          <div className="eyebrow">
            LIVE ANALYSIS REPORT
          </div>

          <h1>
            {location.name} · {result.type}
          </h1>

          <p>
            {result.radiusKm} km radius · Live geographic data
          </p>
        </div>

        <div className="heading-actions">

          <Link to="/compare" className="button secondary">
            Compare
          </Link>

          <button
            className="button primary"
            onClick={() => alert('Save feature coming soon!')}
          >
            ☆ Save
          </button>

        </div>

      </div>


      <div className="analysis-grid">

        {/* MAP */}

        <div className="panel map-panel">

          <div className="panel-head">
            <div>
              <h2>Local business landscape</h2>
              <p>Real nearby businesses</p>
            </div>

            <span className="data-chip">
              ● Live data
            </span>
          </div>

         <MapView
            markers={places}
            center={{
              lat: location.latitude,
              lng: location.longitude
            }}
          />

        </div>


        {/* SCORE */}

        <div className="panel score-panel">

          <div className="eyebrow">
            OPPORTUNITY SCORE
          </div>

          <div className="big-score">
            {intelligence.opportunityScore}
            <span>/100</span>
          </div>

          <p className="muted">
            {intelligence.recommendation}
          </p>

          <div className="score-row">
            <span>Competition</span>
            <b>{intelligence.competitionLevel}</b>
          </div>

          <div className="score-row">
            <span>Business Density</span>
            <b>{intelligence.businessDensity}</b>
          </div>

          <div className="score-row">
            <span>Density Level</span>
            <b>{intelligence.densityLevel}</b>
          </div>

          <div className="score-row">
            <span>Total Businesses</span>
            <b>{intelligence.totalBusinesses}</b>
          </div>

        </div>

      </div>


      {/* STATISTICS */}

      <div className="stats-grid four">

        <div className="metric">
          <span>Businesses Found</span>
          <b>{result.totalPlaces}</b>
          <small>Within {result.radiusKm} km</small>
        </div>

        <div className="metric">
          <span>Competition</span>
          <b>{intelligence.competitionLevel}</b>
          <small>Nearby businesses</small>
        </div>

        <div className="metric">
          <span>Business Density</span>
          <b>{intelligence.businessDensity}</b>
          <small>Businesses per km²</small>
        </div>

        <div className="metric">
          <span>Opportunity Score</span>
          <b>{intelligence.opportunityScore}</b>
          <small>Out of 100</small>
        </div>

      </div>


      {/* CHART AND INTERPRETATION */}

      <div className="two-col">


        <div className="panel chart-panel">

          <div className="panel-head">
            <div>
              <h2>Nearby businesses</h2>
              <p>Count by category</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>

            <BarChart data={chartData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count" />

            </BarChart>

          </ResponsiveContainer>

        </div>



        <div className="panel">

          <div className="panel-head">
            <div>
              <h2>Business interpretation</h2>
              <p>Location intelligence</p>
            </div>
          </div>


          <div className="insight">

            <b>
              Competition: {intelligence.competitionLevel}
            </b>

            <span>
              {intelligence.totalBusinesses} businesses were found
              within the selected area.
            </span>

          </div>


          <div className="insight good">

            <b>
              Density: {intelligence.densityLevel}
            </b>

            <span>
              Business density is {intelligence.businessDensity}
              businesses per square kilometer.
            </span>

          </div>


          <div className="insight good">

            <b>Recommendation</b>

            <span>
              {intelligence.recommendation}
            </span>

          </div>


          <p className="disclaimer">
            This score is a decision-support indicator and is not a
            guarantee of business success.
          </p>

        </div>

      </div>

    </div>
  );
}