import React, { useState } from 'react'

export default function Step5Contact({ data, onNext, onBack }) {
  const [name, setName] = useState('Numaan,H\'s Team')
  const [email, setEmail] = useState('numaanhussain8688@gmail.com')
  const [phone, setPhone] = useState('')

  return (
    <div className="step-container">
      <div className="step-header">
        <h1>Send your estimate</h1>
        <p>How would you like to receive the estimate?</p>
      </div>

      <form name="estimate-submission" method="POST" netlify>
        <input type="hidden" name="form-name" value="estimate-submission" />
        
        <div className="form-card">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-card">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-card">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <input type="hidden" name="estimate" value={JSON.stringify(data)} />

        <div className="step-actions">
          <button type="button" className="btn-secondary" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn-primary">
            📧 Send Estimate
          </button>
        </div>
      </form>
    </div>
  )
}