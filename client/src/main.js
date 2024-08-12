import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px', background: '#f4f4f4', padding: '20px' }}>
        <h2>Prediction</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Link to="/diabetes">Diabetes Prediction</Link>
          </li>
          <li>
            <Link to="/heart_disease">Heart Disease Prediction</Link>
          </li>
          <li>
            <Link to="/parkinsons">Parkinson's Prediction</Link>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Welcome to the health prediction application</h1>
        <p>Select a prediction type from the menu to start</p>
      </div>
    </div>
  );
}

export default MainPage;
