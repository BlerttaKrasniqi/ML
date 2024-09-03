import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaHeartbeat,
  FaGenderless,
  FaThermometerHalf,
  FaChevronCircleLeft,
  FaVial,
  FaStethoscope,
  FaUser,
} from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0ccff, #f2e6ff);
`;

const FormWrapper = styled.div`
  background: linear-gradient(135deg, #ffd5d5, #ffbdbd);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  margin-top: 70px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #900707;
  text-align: center;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  flex: 1;
  min-width: 120px;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #900707;
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
  background-color: #ffe6e6;

  &:focus {
    outline: none;
    border-color: #ff6666;
    box-shadow: 0 0 5px rgba(255, 102, 102, 0.5);
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
  color: #900707;
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

function Heart_Disease_Form() {
  const navigate = useNavigate();
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: Object.values(formData).join(',') }),
      }
    );

    const data = await response.json();
    // const message =
    //   data.prediction === 1
    //     ? 'You have heart disease'
    //     : 'You do not have heart disease';
    setResult(data.prediction);
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Heart Disease Prediction Form</Title>
        <form onSubmit={handleSubmit}>
          <FormRow>
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
            <FormGroup>
              <Label>
                <FaGenderless /> Gender:
              </Label>
              <Input
                type="number"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaHeartbeat /> Chest Pain Type:
              </Label>
              <Input
                type="number"
                name="cp"
                min="0"
                max="2"
                value={formData.cp}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaThermometerHalf /> Resting blood pressure:
              </Label>
              <Input
                type="number"
                name="trestbps"
                value={formData.trestbps}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaVial /> Cholesterol:
              </Label>
              <Input
                type="number"
                name="chol"
                value={formData.chol}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaStethoscope /> Fasting Blood Sugar:
              </Label>
              <Input
                type="number"
                name="fbs"
                value={formData.fbs}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaHeartbeat /> Rest ECG:
              </Label>
              <Input
                type="number"
                name="restecg"
                value={formData.restecg}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaHeartbeat /> Thalach (Max HR):
              </Label>
              <Input
                type="number"
                name="thalach"
                placeholder="Max heart frequency after a stress test"
                value={formData.thalach}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaHeartbeat />
                Exercise Induced Angina:
              </Label>
              <Input
                type="number"
                name="exang"
                min="0"
                max="1"
                placeholder="Chest pain after physical activities"
                value={formData.exang}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaHeartbeat /> Oldpeak:
              </Label>
              <Input
                type="number"
                name="oldpeak"
                value={formData.oldpeak}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaHeartbeat /> Slope:
              </Label>
              <Input
                type="number"
                name="slope"
                value={formData.slope}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <FaHeartbeat />
                Number of Major Vessels:
              </Label>
              <Input
                type="number"
                name="ca"
                min="0"
                max="3"
                placeholder="CA "
                value={formData.ca}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>
                <FaHeartbeat /> Thal:
              </Label>
              <Input
                type="number"
                name="thal"
                value={formData.thal}
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

export default Heart_Disease_Form;
