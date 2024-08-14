import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaVenusMars,
  FaUser,
  FaHeartbeat,
  FaSmoking,
  FaWeight,
  FaTint,
  FaChevronCircleLeft,
} from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  min-height: 1000vh;
  background: linear-gradient(135deg, #f7fff0, #f2ffe7);
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 15px;
`;

const FormWrapper = styled.div`
  background: linear-gradient(135deg, #fbffb6, #faff99);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  margin-top: 70px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #327606;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bttom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #327606;
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
  background-color: #fbffd3;

  &:focus {
    outline: none;
    border-color: #0c6700;
    box-shadow: 0 0 5px rgba(77, 184, 255, 0.5);
  }
`;

const Button = styled.button`
  background-color: #4db8ff;
  color: #ffffff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #0099ff;
  }
`;

const Result = styled.h2`
  font-size: 20px;
  color: #327606;
  text-align: center;
  margin-top: 20px;
  background-color: #fffd6d;
`;

const BackButton = styled(Button)`
  background-color: #ff4d4d;
  margin-top: 10px;

  &:hover {
    background-color: #e60000;
  }
`;

function DiabetesForm() {
  const navigate = useNavigate();
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
    const message =
      data.prediction === 1 ? 'You have diabetes' : 'You do not have diabetes';
    setResult(message);
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Diabetes Prediction Form</Title>
        <form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label>
                <FaVenusMars /> Gender:
              </Label>
              <Input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaUser /> Age:
              </Label>
              <Input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaHeartbeat /> Hypertension:
              </Label>
              <Input
                type="number"
                name="hypertension"
                value={formData.hypertension}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaHeartbeat /> Heart Disease:
              </Label>
              <Input
                type="number"
                name="heartDisease"
                value={formData.heartDisease}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaSmoking /> Smoking History:
              </Label>
              <Input
                type="text"
                name="smokingHistory"
                value={formData.smokingHistory}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaWeight /> BMI:
              </Label>
              <Input
                type="number"
                name="bmi"
                value={formData.bmi}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaTint /> HbA1c Level:
              </Label>
              <Input
                type="number"
                name="hba1cLevel"
                value={formData.hba1cLevel}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaTint /> Blood Glucose Level:
              </Label>
              <Input
                type="number"
                name="bloodGlucoseLevel"
                value={formData.bloodGlucoseLevel}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <Button type="submit">Predict</Button>
        </form>
        {result && (
          <Result>
            Result:{' '}
            {result === 1 ? 'You have Diabetes' : 'You do not have Diabetes'}
          </Result>
        )}

        <BackButton onClick={() => navigate('/')}>
          <FaChevronCircleLeft /> Back to Main Page
        </BackButton>
      </FormWrapper>
    </Container>
  );
}

export default DiabetesForm;
