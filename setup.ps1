# SERVPRO Estimation MVP Setup
mkdir -Force src\components, src\utils, src\styles | Out-Null

# EstimationWizard.jsx
@"
import React, { useState } from 'react';
import Step1DamageType from './Step1-DamageType';
import Step2Measurements from './Step2-Measurements';
import Step3Services from './Step3-Services';
import Step4Review from './Step4-Review';
import '../styles/wizard.css';

export default function EstimationWizard() {
  const [step, setStep] = useState(1);
  const [estimation, setEstimation] = useState({
    damageType: null,
    squareFeet: '',
    complexity: 'moderate',
    services: [],
    laborRate: 65,
  });

  const handleNext = (data) => {
    setEstimation({ ...estimation, ...data });
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="wizard-container">
      <nav className="wizard-nav">
        <div className="nav-brand">
          <div className="logo">SERVPRO</div>
          <span className="subtitle">Estimation Tool</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `\${(step / 4) * 100}%` }}></div>
        </div>
        <span className="step-counter">Step {step} of 4</span>
      </nav>

      <div className="wizard-content">
        {step === 1 && <Step1DamageType data={estimation} onNext={handleNext} />}
        {step === 2 && <Step2Measurements data={estimation} onNext={handleNext} onBack={handleBack} />}
        {step === 3 && <Step3Services data={estimation} onNext={handleNext} onBack={handleBack} />}
        {step === 4 && <Step4Review data={estimation} onBack={handleBack} />}
      </div>
    </div>
  );
}
"@ | Out-File "src\components\EstimationWizard.jsx" -Encoding UTF8 -Force

Write-Host "Files created!" -ForegroundColor Green