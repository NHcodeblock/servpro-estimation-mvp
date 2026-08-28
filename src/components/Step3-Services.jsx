import React, { useState } from 'react'

const ADDITIONAL_SERVICES = [
  { id: 'demolition', label: 'Demolition', cost: 2500 },
  { id: 'disposal', label: 'Debris Disposal', cost: 1500 },
  { id: 'mold', label: 'Mold Testing & Treatment', cost: 3000 },
  { id: 'odor', label: 'Odor Removal', cost: 800 },
  { id: 'dehumidify', label: 'Dehumidification', cost: 1200 },
  { id: 'carpet', label: 'Carpet Replacement', cost: 2000 },
  { id: 'hardwood', label: 'Hardwood Floor Restoration', cost: 3500 },
  { id: 'painting', label: 'Painting & Drywall', cost: 2800 },
  { id: 'electrical', label: 'Electrical Inspection', cost: 600 },
  { id: 'plumbing', label: 'Plumbing Inspection', cost: 750 },
  { id: 'hvac', label: 'HVAC Cleaning', cost: 1500 },
  { id: 'contents', label: 'Contents Cleaning & Restoration', cost: 4000 },
]

export default function Step3Services({ data, onNext, onBack }) {
  const [services, setServices] = useState(data.services || [])

  const toggleService = (serviceId) => {
    if (services.includes(serviceId)) {
      setServices(services.filter((s) => s !== serviceId))
    } else {
      setServices([...services, serviceId])
    }
  }

  return (
    <div className="step-container">
      <div className="step-header">
        <h1>Additional Services</h1>
        <p>Select any services needed for this project</p>
      </div>

      <div className="services-list">
        {ADDITIONAL_SERVICES.map((service) => (
          <label key={service.id} className="service-item">
            <input
              type="checkbox"
              checked={services.includes(service.id)}
              onChange={() => toggleService(service.id)}
            />
            <div className="service-info">
              <div className="service-label">{service.label}</div>
              <div className="service-cost">${service.cost.toLocaleString()}</div>
            </div>
          </label>
        ))}
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button 
          className="btn-primary" 
          onClick={() => onNext({ services })}
        >
          Continue to Review
        </button>
      </div>
    </div>
  )
}