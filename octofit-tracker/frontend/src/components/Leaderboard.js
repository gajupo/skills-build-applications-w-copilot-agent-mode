import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboards, setLeaderboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const protocol = codespaceName ? 'https' : 'http';
        const host = codespaceName ? `${codespaceName}-8000.app.github.dev` : 'localhost:8000';
        const url = `${protocol}://${host}/api/leaderboards/`;
        
        console.log('Fetching Leaderboards from:', url);
        console.log('Codespace Name:', codespaceName);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Handle both paginated and plain array responses
        const leaderboardsList = data.results ? data.results : (Array.isArray(data) ? data : []);
        
        console.log('Fetched Leaderboards data:', data);
        console.log('Processed Leaderboards:', leaderboardsList);
        
        // Sort by score in descending order
        const sorted = [...leaderboardsList].sort((a, b) => b.score - a.score);
        
        setLeaderboards(sorted);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboards:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboards();
  }, []);

  if (loading) {
    return (
      <div className="content-container">
        <div className="container">
          <div className="alert alert-info" role="alert">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            Loading leaderboards...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-container">
        <div className="container">
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div className="container">
        <h2>🏆 Leaderboards</h2>
        {leaderboards.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>No leaderboards found.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Rank</th>
                  <th>Team</th>
                  <th style={{ width: '150px' }}>Score</th>
                  <th style={{ width: '200px' }}>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {leaderboards.map((leaderboard, index) => (
                  <tr key={leaderboard.id}>
                    <td>
                      {index === 0 ? (
                        <span className="badge bg-warning text-dark">🥇 1st</span>
                      ) : index === 1 ? (
                        <span className="badge bg-secondary">🥈 2nd</span>
                      ) : index === 2 ? (
                        <span className="badge bg-warning" style={{ color: '#8B4513' }}>🥉 3rd</span>
                      ) : (
                        <span className="badge bg-info text-dark">#{index + 1}</span>
                      )}
                    </td>
                    <td>
                      <strong>{leaderboard.team}</strong>
                    </td>
                    <td>
                      <span className="badge bg-success" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                        {leaderboard.score}
                      </span>
                    </td>
                    <td>
                      <small className="text-muted">
                        {new Date(leaderboard.updated_at).toLocaleDateString()}
                      </small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
