import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const protocol = codespaceName ? 'https' : 'http';
        const host = codespaceName ? `${codespaceName}-8000.app.github.dev` : 'localhost:8000';
        const url = `${protocol}://${host}/api/activities/`;
        
        console.log('Fetching Activities from:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Handle both paginated and plain array responses
        const activitiesList = data.results ? data.results : (Array.isArray(data) ? data : []);
        
        console.log('Fetched Activities data:', data);
        console.log('Processed Activities:', activitiesList);
        
        setActivities(activitiesList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="content-container">
        <div className="container">
          <div className="alert alert-info" role="alert">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            Loading activities...
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
        <h2>🏃 Activities</h2>
        {activities.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>No activities found.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Activity Type</th>
                  <th>Duration (mins)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>
                      <span className="badge bg-secondary">{activity.id}</span>
                    </td>
                    <td>{activity.user}</td>
                    <td>
                      <span className="badge bg-info text-dark">{activity.activity_type}</span>
                    </td>
                    <td>
                      <strong>{activity.duration}</strong>
                    </td>
                    <td>{activity.date}</td>
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

export default Activities;
