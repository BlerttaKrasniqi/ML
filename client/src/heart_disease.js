import React, { useState } from 'react';

function Heart_Disease_Form() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
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
    const response = await fetch(
      'http://127.0.0.1:5000/predict_heart_disease',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ input: Object.values(formData).join(',') }),
      }
    );
    const data = await response.json();
    setResult(data.prediction);
  };

  return (
    <div>
      <h1>Heart Disease Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age: </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sex: </label>
          <input
            type="number"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>cp: </label>
          <input
            type="number"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>trestbps: </label>
          <input
            type="number"
            name="trestbps"
            value={formData.trestbps}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>chol</label>
          <input
            type="number"
            name="chol"
            value={formData.chol}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>fbs: </label>
          <input
            type="number"
            name="fbs"
            value={formData.fbs}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>restecg: </label>
          <input
            type="number"
            name="restecg"
            value={formData.restecg}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>thalach: </label>
          <input
            type="number"
            name="thalach"
            value={formData.thalach}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>exang: </label>
          <input
            type="number"
            name="exang"
            value={formData.exang}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>oldpeak: </label>
          <input
            type="number"
            name="oldpeak"
            value={formData.oldpeak}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>slope: </label>
          <input
            type="number"
            name="slope"
            value={formData.slope}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ca: </label>
          <input
            type="number"
            name="ca"
            value={formData.ca}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>thal: </label>
          <input
            type="number"
            name="thal"
            value={formData.thal}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Predict</button>
      </form>
      {result && (
        <h2>
          Prediction result: {''}
          {result === 1 ? 'Has heart disease' : 'Does not have heart disease'}
        </h2>
      )}
    </div>
  );
}

export default Heart_Disease_Form;
