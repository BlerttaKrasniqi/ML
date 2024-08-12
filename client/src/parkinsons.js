import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ParkinsonsForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    'MDVP:Fo(Hz)': '',
    'MDVP:Fhi(Hz)': '',
    'MDVP:Flo(Hz)': '',
    'MDVP:Jitter(%)': '',
    'MDVP:Jitter(Abs)': '',
    'MDVP:RAP': '',
    'MDVP:PPQ': '',
    'Jitter:DDP': '',
    'MDVP:Shimmer': '',
    'MDVP:Shimmer(dB)': '',
    'Shimmer:APQ3': '',
    'Shimmer:APQ5': '',
    'MDVP:APQ': '',
    'Shimmer:DDA': '',
    NHR: '',
    HNR: '',
    RPDE: '',
    DFA: '',
    spread1: '',
    spread2: '',
    D2: '',
    PPE: '',
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
    const response = await fetch('http://127.0.0.1:5000/predict_parkinsons', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ input: Object.values(formData).join(',') }),
    });
    const data = await response.json();
    setResult(data.prediction);
  };

  return (
    <div>
      <h1>Parkinsons prediction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>MDVP:Fo(Hz)</label>
          <input
            type="number"
            name="MDVP:Fo(Hz)"
            value={formData['MDVP:Fo(Hz)']}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>MDVP:Fhi(Hz)</label>
          <input
            type="number"
            name="MDVP:Fhi(Hz)"
            value={formData['MDVP:Fhi(Hz)']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>MDVP:Flo(Hz)</label>
          <input
            type="number"
            name="MDVP:Flo(Hz)"
            value={formData['MDVP:Flo(Hz)']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>MDVP:Jitter(%)</label>
          <input
            type="number"
            name="MDVP:Jitter(%)"
            value={formData['MDVP:Jitter(%)']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>MDVP:Jitter(Abs)</label>
          <input
            type="number"
            name="MDVP:Jitter(Abs)"
            value={formData['MDVP:Jitter(Abs)']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>MDVP:RAP</label>
          <input
            type="number"
            name="MDVP:RAP"
            value={formData['MDVP:RAP']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>MDVP:PPQ</label>
          <input
            type="number"
            name="MDVP:PPQ"
            value={formData['MDVP:PPQ']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Jitter:DDP</label>
          <input
            type="number"
            name="Jitter:DDP"
            value={formData['Jitter:DDP']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>MDVP:Shimmer</label>
          <input
            type="number"
            name="MDVP:Shimmer"
            value={formData['MDVP:Shimmer']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>MDVP:Shimmer(dB)</label>
          <input
            type="number"
            name="MDVP:Shimmer(dB)"
            value={formData['MDVP:Shimmer(dB)']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Shimmer:APQ3</label>
          <input
            type="number"
            name="Shimmer:APQ3"
            value={formData['Shimmer:APQ3']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Shimmer:APQ5</label>
          <input
            type="number"
            name="Shimmer:APQ5"
            value={formData['Shimmer:APQ5']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>MDVP:APQ</label>
          <input
            type="number"
            name="MDVP:APQ"
            value={formData['MDVP:APQ']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Shimmer:DDA</label>
          <input
            type="number"
            name="Shimmer:DDA"
            value={formData['Shimmer:DDA']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>NHR</label>
          <input
            type="number"
            name="NHR"
            value={formData['NHR']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>HNR</label>
          <input
            type="number"
            name="HNR"
            value={formData['HNR']}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>RPDE</label>
          <input
            type="number"
            name="RPDE"
            value={formData.RPDE}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>DFA</label>
          <input
            type="number"
            name="DFA"
            value={formData.DFA}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>spread1</label>
          <input
            type="number"
            name="spread1"
            value={formData.spread1}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>spread2</label>
          <input
            type="number"
            name="spread2"
            value={formData.spread2}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>D2</label>
          <input
            type="number"
            name="D2"
            value={formData.D2}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>PPE</label>
          <input
            type="number"
            name="PPE"
            value={formData.PPE}
            onChange={handleChange}
            required
          />
          <button type="submit">Predict</button>
        </div>
      </form>
      {result && (
        <h2>
          Prediction Result:{' '}
          {result === 1 ? 'Has parkinsons' : 'Does not have parkinsons'}
        </h2>
      )}
      <button onClick={() => navigate('/')}>Back to Main Page</button>
    </div>
  );
}

export default ParkinsonsForm;
