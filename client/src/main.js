import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import {
  FaHeartbeat,
  FaBrain,
  FaStethoscope,
  FaNotesMedical,
} from 'react-icons/fa';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  background-size: cover;
  background-color: #f0f4f8;
  background: linear-gradient(135deg, #f8facd, #fce3db);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  align-items: center;
  display: flex;
  // text-shadow: 0 0 5px #3355ff, 0 0 10px #3355ff;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.button`
  background-color: #49a9c2;
  border-radius: 15px;
  border-color: white;
  color: white;

  width: 200px;
  height: 150px;
  margin: 10px;
  //   box-shadow: 20px 20px 20px 20px rgba(255, 255, 255, 255);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  h2 {
    margin-top: 1rem;
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
    color: #555;
  }
`;

const DiabetesCard = styled(Card)`
  &:hover {
    background-color: yellow;
    color: black;
  }
`;

const HeartCard = styled(Card)`
  &:hover {
    background-color: red;
    color: white;
  }
`;

const ParkinsonsCard = styled(Card)`
  &:hover {
    background-color: salmon;
    color: white;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-right: 0.5rem;
`;

function MainPage() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Title>
        <IconWrapper>
          <FaNotesMedical></FaNotesMedical>
        </IconWrapper>
        Disease Prediction System
      </Title>
      <CardContainer>
        <DiabetesCard onClick={() => navigate('/diabetes')}>
          <IconWrapper>
            <FaStethoscope />
          </IconWrapper>
          Diabetes
        </DiabetesCard>
        <HeartCard onClick={() => navigate('/heart_disease')}>
          <IconWrapper>
            <FaHeartbeat />
          </IconWrapper>
          Heart Disease
        </HeartCard>
        <ParkinsonsCard onClick={() => navigate('/parkinsons')}>
          <IconWrapper>
            <FaBrain />
          </IconWrapper>
          Parkinson's
        </ParkinsonsCard>
      </CardContainer>
    </MainContainer>
  );
}

export default MainPage;
