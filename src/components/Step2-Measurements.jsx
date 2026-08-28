import React, { useState } from 'react'

const COMPLEXITY_LEVELS = [
  { id: 'mild', label: 'Mild', desc: 'Minor damage, basic cleanup' },
  { id: 'moderate', label: 'Moderate', desc: 'Significant damage, some restoration' },
  { id: 'severe', label: 'Severe', desc: 'Major damage, extensive work required' },
]

export default function Step2Measurements({ data, onNext, onBack }) {
  const [squareFeet, setSquareFeet] = useState(data.squareFeet || '')
  const [complexity, setComplexity] = useState(data.complexity || 'moderate')
  const [error, setError] = useState('')

  const handleNext = () => {
    // Validation
    const sqft = parseInt(squareFeet)
    
    if (!squareFeet || squareFeet.trim() === '') {
      setError('Please enter square footage')
      return
    }
    
    if (isNaN(sqft)) {
      setError('Square footage must be a number')
      return
    }
    
    if (sqft < 1) {
      setError('Square footage must be at least 1')
      return
    }
    
    if (sqft > 100000) {
      setError('Square footage cannot exceed 100,000')
      return
    }
    
    setError('')
    onNext({ squareFeet: sqft, complexity })
  }

  return (
    <div className="step-container">
      <div className="step-header">
        <h1>Tell us about the damage</h1>
        <p>This helps us calculate an accurate estimate</p>
      </div>

      {error && (
        <div className="error-message" style={{
          background: '#fee2e2',
          border: '1px solid #fca5a5',
          color: '#991b1b',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          fontSize: '14px'
        }}>
          ⚠️ {error}
        </div>
      )}

      <div className="form-card">
        <label htmlFor="sqft">Square Footage Affected</label>
        <input
          id="sqft"
          type="number"
          placeholder="e.g. 2500"
          value={squareFeet}
          onChange={(e) => {
            setSquareFeet(e.target.value)
            setError('')
          }}
          min="1"
          max="100000"
        />
        <small>Enter the area that needs restoration (1 - 100,000 sq ft)</small>
      </div>

      <div className="form-card">
        <label htmlFor="complexity">Complexity Level</label>
        <div className="complexity-options">
          {COMPLEXITY_LEVELS.map((level) => (
            <button
              key={level.id}
              id={level.id === 'moderate' ? 'complexity' : undefined}
              className={`complexity-btn ${complexity === level.id ? 'selected' : ''}`}
              onClick={() => setComplexity(level.id)}
            >
              <div className="cb-title">{level.label}</div>
              <div className="cb-desc">{level.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button 
          className="btn-primary" 
          onClick={handleNext}
        >
          Continue
        </button>
      </div>
    </div>
  )
}