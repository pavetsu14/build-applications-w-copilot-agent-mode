import React, { useEffect, useState } from 'react';

const isDev = process.env.NODE_ENV !== 'production';
const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const endpoint = `${baseUrl}/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isDev) {
      console.log('Fetching from:', endpoint);
    }
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setUsers(results);
        if (isDev) {
          console.log('Fetched users:', data);
        }
      })
      .catch(err => {
        if (isDev) {
          console.error('Error fetching users:', err);
        }
      });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user, idx) => (
          <li key={user.id || idx}>{user.username || user.name || JSON.stringify(user)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
