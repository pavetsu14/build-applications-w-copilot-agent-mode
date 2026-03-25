import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME || process.env.CODESPACE_NAME || 'localhost';
const endpoint = codespace === 'localhost'
  ? 'http://localhost:8000/api/leaderboard/'
  : `https://${codespace}-8000.app.github.dev/api/leaderboard/`;
console.log('Leaderboard endpoint:', endpoint);

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setLeaders(results);
        console.log('Fetched leaderboard:', data);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {leaders.length > 0 ? (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {Object.keys(leaders[0]).map((key) => (
                <th key={key} style={{ border: '1px solid #ccc', padding: '8px', background: '#f5f5f5' }}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, idx) => (
              <tr key={leader.id || idx}>
                {Object.keys(leaders[0]).map((key) => {
                  const value = leader[key];
                  if (typeof value === 'object' && value !== null) {
                    if (value.username) {
                      return <td key={key} style={{ border: '1px solid #ccc', padding: '8px' }}>{value.username}</td>;
                    } else if (value.name) {
                      return <td key={key} style={{ border: '1px solid #ccc', padding: '8px' }}>{value.name}</td>;
                    } else {
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
        <p>No leaderboard data found.</p>
      )}
    </div>
  );
}

export default Leaderboard;
