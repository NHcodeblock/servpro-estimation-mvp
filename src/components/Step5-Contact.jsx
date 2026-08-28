import React, { useState } from 'react'

export default function Step5Contact({ data, onNext, onBack }) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [sendEmail, setSendEmail] = useState(true)
  const [sendSMS, setSendSMS] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone) => {
  const digitsOnly = phone.replace(/\D/g, '')
  return digitsOnly.length >= 10
  }

  const handleNext = async () => {
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (sendEmail) {
      if (!email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(email)) {
        newErrors.email = 'Please enter a valid email'
      }
    }

    if (sendSMS) {
      if (!phone.trim()) {
        newErrors.phone = 'Phone is required for SMS'
      } else if (!validatePhone(phone)) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch('/.netlify/functions/send-estimate', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email: sendEmail ? email : '',
          phone: sendSMS ? phone : '',
          estimate: data,
          sendEmail,
          sendSMS,
        })
      })

      const result = await response.json()
      
      if (response.ok) {
        setSuccessMessage('✅ Estimate sent successfully!')
        setTimeout(() => {
          onNext({
            email: sendEmail ? email : '',
            phone: sendSMS ? phone : '',
            name,
            sendEmail,
            sendSMS,
          })
        }, 1500)
      } else {
        setErrors({ form: result.error || 'Failed to send estimate' })
      }
    } catch (error) {
      setErrors({ form: 'Error sending estimate: ' + error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="step-container">
      <div className="step-header">
        <h1>Send your estimate</h1>
        <p>How would you like to receive the estimate?</p>
      </div>

      {errors.form && (
        <div style={{
          background: '#fee2e2',
          border: '1px solid #fca5a5',
          color: '#991b1b',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          fontSize: '14px'
        }}>
          ⚠️ {errors.form}
        </div>
      )}

      <div className="form-card">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="e.g. John Doe"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setErrors({ ...errors, name: '' })
          }}
        />
        {errors.name && <small style={{ color: '#dc2626' }}>⚠️ {errors.name}</small>}
      </div>

      <div className="form-card">
        <label style={{ marginBottom: '1rem' }}>
          <input
            type="checkbox"
            checked={sendEmail}
            onChange={(e) => setSendEmail(e.target.checked)}
            style={{ marginRight: '8px', width: '18px', height: '18px', cursor: 'pointer' }}
          />
          Send via Email
        </label>
        {sendEmail && (
          <>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="e.g. john@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setErrors({ ...errors, email: '' })
              }}
            />
            {errors.email && <small style={{ color: '#dc2626' }}>⚠️ {errors.email}</small>}
          </>
        )}
      </div>

      <div className="form-card">
        <label style={{ marginBottom: '1rem' }}>
          <input
            type="checkbox"
            checked={sendSMS}
            onChange={(e) => setSendSMS(e.target.checked)}
            style={{ marginRight: '8px', width: '18px', height: '18px', cursor: 'pointer' }}
          />
          Send via SMS (Text Message)
        </label>
        {sendSMS && (
          <>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. (708) 240-4873"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                setErrors({ ...errors, phone: '' })
              }}
            />
            {errors.phone && <small style={{ color: '#dc2626' }}>⚠️ {errors.phone}</small>}
          </>
        )}
      </div>

      <div className="form-card" style={{ background: '#fffbf0', border: '1px solid #ffe4cc' }}>
        <small style={{ color: '#8b5a00' }}>
          ℹ️ Your estimate will be sent immediately after you submit. Check your email or phone for the message.
        </small>
      </div>

      {successMessage && (
        <div style={{
          background: '#dcfce7',
          border: '1px solid #86efac',
          color: '#166534',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '1.5rem',
        }}>
          {successMessage}
        </div>
      )}

      <div className="step-actions">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button 
          className="btn-primary" 
          onClick={handleNext}
          disabled={!sendEmail && !sendSMS || loading}
        >
          {loading ? '⏳ Sending...' : '📧 Send Estimate'}
        </button>
      </div>
    </div>
  )
}