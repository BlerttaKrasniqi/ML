import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaBrain,
  FaWaveSquare,
  FaChevronCircleLeft,
  FaVolumeUp,
  FaMicrophone,
  FaMicrophoneAlt,
} from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #e6e0ff, #f3f0ff);
`;

const FormWrapper = styled.div`
  background: linear-gradient(135deg, #e1d9ff, #d1c4ff);
  padding: 30px;
  border-radius: 10px;
  //box-shadow: 0px 0px 20px 5px rgba(192, 128, 255, 0.7);
  max-width: 800px;
  width: 100%;
  margin-top: 70px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #4b0082;
  text-align: center;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 14px;
  color: #4b0082;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
  box-sizing: border-box;
  background-color: #f3f0ff;

  &:focus {
    outline: none;
    border-color: #a020f0;
    box-shadow: 0 0 5px rgba(160, 32, 240, 0.5);
  }
`;

const Button = styled.button`
  background-color: #ff6666;
  color: #ffffff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #e60000;
  }
`;

const Result = styled.h2`
  font-size: 20px;
  color: #4b0082;
  text-align: center;
  margin-top: 20px;
`;

const BackButton = styled(Button)`
  background-color: #4d4dff;
  margin-top: 10px;

  &:hover {
    background-color: #1a1aff;
  }
`;

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
    <Container>
      <FormWrapper>
        <Title>Parkinson's Disease Prediction</Title>
        <form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label>
                <FaBrain /> MDVP:Fo(Hz) - Voice frequency
              </Label>
              <Input
                type="number"
                name="MDVP:Fo(Hz)"
                value={formData['MDVP:Fo(Hz)']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaWaveSquare /> MDVP:Fhi(Hz) - Max voice frequency
              </Label>
              <Input
                type="number"
                name="MDVP:Fhi(Hz)"
                value={formData['MDVP:Fhi(Hz)']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaWaveSquare /> MDVP:Flo(Hz) - Min voice frequency
              </Label>
              <Input
                type="number"
                name="MDVP:Flo(Hz)"
                value={formData['MDVP:Flo(Hz)']}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaMicrophone /> MDVP:Jitter(%) - Change in frequency
              </Label>
              <Input
                type="number"
                name="MDVP:Jitter(%)"
                value={formData['MDVP:Jitter(%)']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaMicrophone /> MDVP:Jitter(Abs) - Absolute change
              </Label>
              <Input
                type="number"
                name="MDVP:Jitter(Abs)"
                value={formData['MDVP:Jitter(Abs)']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaVolumeUp /> MDVP:RAP - Short-term variability
              </Label>
              <Input
                type="number"
                name="MDVP:RAP"
                value={formData['MDVP:RAP']}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaVolumeUp /> MDVP:PPQ - Change in pitch periods over times
              </Label>
              <Input
                type="number"
                name="MDVP:PPQ"
                value={formData['MDVP:PPQ']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaMicrophone /> Jitter:DDP - Average absolute difference
                between consecutive sound periods
              </Label>
              <Input
                type="number"
                name="Jitter:DDP"
                value={formData['Jitter:DDP']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaWaveSquare /> MDVP:Shimmer - Change in voice amplitudes
              </Label>
              <Input
                type="number"
                name="MDVP:Shimmer"
                value={formData['MDVP:Shimmer']}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaMicrophone /> MDVP:Shimmer(dB) - Change in sound amplitudes
                in decibel
              </Label>
              <Input
                type="number"
                name="MDVP:Shimmer(dB)"
                value={formData['MDVP:Shimmer(dB)']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaMicrophone /> Shimmer:APQ3 - Variability in amplitude during
                three height periods
              </Label>
              <Input
                type="number"
                name="Shimmer:APQ3"
                value={formData['Shimmer:APQ3']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaVolumeUp /> Shimmer:APQ5 - Variability in amplitude during
                five height periods
              </Label>
              <Input
                type="number"
                name="Shimmer:APQ5"
                value={formData['Shimmer:APQ5']}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaVolumeUp /> MDVP:APQ - Provides a wider measure of amplitude
                variability
              </Label>
              <Input
                type="number"
                name="MDVP:APQ"
                value={formData['MDVP:APQ']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaWaveSquare /> Shimmer:DDA - Mean absolute difference between
                consecutive amplitude periods
              </Label>
              <Input
                type="number"
                name="Shimmer:DDA"
                value={formData['Shimmer:DDA']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaMicrophone /> NHR - Amount of noise relative to the harmonic
                components of the sound
              </Label>
              <Input
                type="number"
                name="NHR"
                value={formData['NHR']}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaVolumeUp /> HNR - The proportion of harmonic sound relative
                to noise
              </Label>
              <Input
                type="number"
                name="HNR"
                value={formData['HNR']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaWaveSquare /> RPDE - The complexity of audio signals
              </Label>
              <Input
                type="number"
                name="RPDE"
                value={formData['RPDE']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaMicrophone /> DFA - Self-similarity, or fractal scaling,
                properties of the audio signal
              </Label>
              <Input
                type="number"
                name="DFA"
                value={formData['DFA']}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaWaveSquare /> Spread1 - The range of frequency components in
                the audio signal
              </Label>
              <Input
                type="number"
                name="spread1"
                value={formData['spread1']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaWaveSquare /> Spread2
              </Label>
              <Input
                type="number"
                name="spread2"
                value={formData['spread2']}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaVolumeUp /> D2 - The complexity of the vocal signal
              </Label>
              <Input
                type="number"
                name="D2"
                value={formData['D2']}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaMicrophoneAlt /> PPE - Randomness in pitch periods
              </Label>
              <Input
                type="number"
                name="PPE"
                value={formData['PPE']}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <Button type="submit">Predict</Button>
        </form>
        {result !== null && (
          <Result>
            Prediction Result:{' '}
            {result === 1
              ? 'You have Parkinsons disease'
              : 'You do not have Parkinsons disease'}
          </Result>
        )}
        <BackButton onClick={() => navigate('/')}>
          <FaChevronCircleLeft /> Back to Main Page
        </BackButton>
      </FormWrapper>
    </Container>
  );
}

export default ParkinsonsForm;
