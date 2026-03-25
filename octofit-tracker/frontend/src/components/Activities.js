import React, { useEffect, useState } from 'react';

const isDev = process.env.NODE_ENV !== 'production';
const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const endpoint = `${baseUrl}/api/activities/`;
if (isDev) {
  console.log('Activities endpoint:', endpoint);
}

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (isDev) {
      console.log('Fetching from:', endpoint);
    }
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setActivities(results);
        if (isDev) {
          console.log('Fetched activities:', data);
        }
      })
      .catch(err => {
        if (isDev) {
          console.error('Error fetching activities:', err);
        }
      });
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      {activities.length > 0 ? (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {Object.keys(activities[0]).map((key) => (
                <th key={key} style={{ border: '1px solid #ccc', padding: '8px', background: '#f5f5f5' }}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                {Object.keys(activities[0]).map((key) => {
                  const value = activity[key];
                  if (typeof value === 'object' && value !== null) {
                    // Special handling for nested objects (e.g., user, team)
                    if (value.username) {
                      // User object
                      return <td key={key} style={{ border: '1px solid #ccc', padding: '8px' }}>{value.username}</td>;
                    } else if (value.name) {
                      // Team object
                      return <td key={key} style={{ border: '1px solid #ccc', padding: '8px' }}>{value.name}</td>;
                    } else {
                      // Fallback: JSON stringify
                      return <td key={key} style={{ border: '1px solid #ccc', padding: '8px' }}>{JSON.stringify(value)}</td>;
                    }
                  } else {
                    return <td key={key} style={{ border: '1px solid #ccc', padding: '8px' }}>{value}</td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No activities found.</p>
      )}
    </div>
  );
}

export default Activities;
