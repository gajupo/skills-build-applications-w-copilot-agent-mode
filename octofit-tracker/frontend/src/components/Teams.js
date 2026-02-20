import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const protocol = codespaceName ? 'https' : 'http';
        const host = codespaceName ? `${codespaceName}-8000.app.github.dev` : 'localhost:8000';
        const url = `${protocol}://${host}/api/teams/`;
        
        console.log('Fetching Teams from:', url);
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
        const teamsList = data.results ? data.results : (Array.isArray(data) ? data : []);
        
        console.log('Fetched Teams data:', data);
        console.log('Processed Teams:', teamsList);
        
        setTeams(teamsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="content-container">
        <div className="container">
          <div className="alert alert-info" role="alert">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            Loading teams...
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
        <h2>🏊 Teams</h2>
        {teams.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>No teams found.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td>
                      <span className="badge bg-secondary">{team.id}</span>
                    </td>
                    <td>
                      <strong>{team.name}</strong>
                    </td>
                    <td>
                      <span className="badge bg-primary">
                        {team.members ? team.members.length : 0} members
                      </span>
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

export default Teams;
