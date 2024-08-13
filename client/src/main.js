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

  background: linear-gradient(135deg, #f8f9c2, #f9d2cd);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  align-items: center;
  display: flex;
  // text-shadow: 0 0 5px #3355ff, 0 0 10px #3355ff;
  text-shadow: 2px 2px 5px;
  animation: fadeIn 2s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
`;

const CardContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.button`
  background-color: #49a9c2;
  background: linear-gradient(135deg, #6f72f5, #49a9c2);
  border-radius: 15px;
  border-color: #2b58dc;
  color: white;

  width: 200px;
  height: 150px;
  margin: 10px;
  //   box-shadow: 20px 20px 20px 20px rgba(255, 255, 255, 255);
  padding: 2rem;
  text-align: center;
  cursor: pointer;

  transition: transform 0.3s ease-in-out;
  perspective: 1000px;

  &:hover {
    transform: translateY(-15px);
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
    background: linear-gradient(135deg, #fffd78, #fffc24);
    color: black;
    box-shadow: 0px 0px 20px 5px rgba(255, 255, 0, 0.7);
    border-color: black;
  }
`;

const HeartCard = styled(Card)`
  &:hover {
    background: linear-gradient(135deg, #ff4848, #ff0707);
    color: black;
    box-shadow: 0px 0px 20px 5px rgba(255, 0, 0, 0.7);
    border-color: black;
  }
`;

const ParkinsonsCard = styled(Card)`
  &:hover {
    background: linear-gradient(135deg, #fda6a6, #f98f8f);
    color: black;
    box-shadow: 0px 0px 20px 5px rgba(255, 160, 122, 0.7);
    border-color: black;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
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
