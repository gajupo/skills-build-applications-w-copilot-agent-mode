import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const protocol = codespaceName ? 'https' : 'http';
        const host = codespaceName ? `${codespaceName}-8000.app.github.dev` : 'localhost:8000';
        const url = `${protocol}://${host}/api/workouts/`;
        
        console.log('Fetching Workouts from:', url);
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
        const workoutsList = data.results ? data.results : (Array.isArray(data) ? data : []);
        
        console.log('Fetched Workouts data:', data);
        console.log('Processed Workouts:', workoutsList);
        
        setWorkouts(workoutsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="content-container">
        <div className="container">
          <div className="alert alert-info" role="alert">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            Loading workouts...
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
        <h2>💪 Workouts</h2>
        {workouts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>No workouts found.</p>
          </div>
        ) : (
          <div className="row">
            {workouts.map((workout) => (
              <div className="col-md-6 col-lg-4 mb-4" key={workout.id}>
                <div className="card h-100">
                  <div className="card-header">
                    <h5 className="card-title mb-0">{workout.name}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{workout.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-secondary">ID: {workout.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
