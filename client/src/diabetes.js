import React, { useState } from 'react';

function DiabetesForm() {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    hypertension: '',
    heartDisease: '',
    smokingHistory: '',
    bmi: '',
    hba1cLevel: '',
    bloodGlucoseLevel: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/predict_diabetes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: Object.values(formData).join(',') }),
    });
    const data = await response.json();
    setResult(data.prediction);
  };

  return (
    <div>
      <h1>Diabetes Prediction Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hypertension:</label>
          <input
            type="number"
            name="hypertension"
            value={formData.hypertension}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Heart Disease:</label>
          <input
            type="number"
            name="heartDisease"
            value={formData.heartDisease}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Smoking History:</label>
          <input
            type="text"
            name="smokingHistory"
            value={formData.smokingHistory}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>BMI:</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>HbA1c Level:</label>
          <input
            type="number"
            name="hba1cLevel"
            value={formData.hba1cLevel}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Blood Glucose Level:</label>
          <input
            type="number"
            name="bloodGlucoseLevel"
            value={formData.bloodGlucoseLevel}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Predict</button>
      </form>
      {result && (
        <h2>
          Prediction Result:{' '}
          {result === 1 ? 'Has Diabetes' : 'Does not have Diabetes'}
        </h2>
      )}
    </div>
  );
}

export default DiabetesForm;
