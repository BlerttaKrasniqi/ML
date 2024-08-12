import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './main';
import HeartDiseaseForm from './heart_disease';
import ParkinsonsForm from './parkinsons';
import DiabetesForm from './diabetes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/diabetes" element={<DiabetesForm />} />
        <Route path="/heart_disease" element={<HeartDiseaseForm />} />
        <Route path="/parkinsons" element={<ParkinsonsForm />} />
      </Routes>
    </Router>
  );
}

export default App;
