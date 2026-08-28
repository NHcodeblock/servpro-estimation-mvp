import React, { useState } from 'react'

const DAMAGE_TYPES = [
  { id: 'water', label: 'Water Damage', icon: '💧' },
  { id: 'fire', label: 'Fire Damage', icon: '🔥' },
  { id: 'mold', label: 'Mold Remediation', icon: '🍄' },
  { id: 'smoke', label: 'Smoke Damage', icon: '💨' },
  { id: 'storm', label: 'Storm Damage', icon: '⛈️' },
  { id: 'biohazard', label: 'Biohazard Cleanup', icon: '⚠️' },
  { id: 'flood', label: 'Flood Damage', icon: '🌊' },
  { id: 'wind', label: 'Wind Damage', icon: '💨' },
  { id: 'hoarding', label: 'Hoarding Cleanup', icon: '📦' },
  { id: 'vandalism', label: 'Vandalism Restoration', icon: '🚨' },
]

export default function Step1DamageType({ onNext }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="step-container">
      <div className="step-header">
        <h1>What type of damage?</h1>
        <p>Select the primary issue affecting the property</p>
      </div>

      <div className="damage-grid">
        {DAMAGE_TYPES.map((dmg) => (
          <button
            key={dmg.id}
            className={`damage-card ${selected === dmg.id ? 'selected' : ''}`}
            onClick={() => setSelected(dmg.id)}
          >
            <div className="damage-icon">{dmg.icon}</div>
            <div className="damage-label">{dmg.label}</div>
          </button>
        ))}
      </div>

      <div className="step-actions">
        <button 
          className="btn-primary" 
          onClick={() => onNext({ damageType: selected })}
          disabled={!selected}
        >
          Continue
        </button>
      </div>
    </div>
  )
}