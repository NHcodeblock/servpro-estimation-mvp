import React from 'react'
import { jsPDF } from 'jspdf'
import { calculateEstimate } from '../utils/calculations'

export default function Step4Review({ data, onNext, onBack }) {
  const estimate = calculateEstimate(data)

  const handleExportPDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    
    // Header
    doc.setFontSize(24)
    doc.setTextColor(255, 107, 53)
    doc.text('SERVPRO', 20, 20)
    
    doc.setFontSize(10)
    doc.setTextColor(107, 114, 128)
    doc.text('Fire & Water - Cleanup & Restoration', 20, 28)
    doc.text('24/7 Emergency Service Available', 20, 33)
    
    // Contact
    doc.setFontSize(9)
    doc.setTextColor(15, 17, 23)
    doc.text('Phone: (708) 240-4873', 20, 40)
    doc.text('Office: (708) 688-9635', 20, 45)
    doc.text('Email: servpro@example.com', 20, 50)
    
    // Divider
    doc.setDrawColor(255, 107, 53)
    doc.setLineWidth(1)
    doc.line(20, 54, pageWidth - 20, 54)
    
    // Details
    doc.setFontSize(11)
    doc.setTextColor(15, 17, 23)
    doc.text('DAMAGE ASSESSMENT', 20, 62)
    
    doc.setFontSize(10)
    doc.text(`Damage Type: ${data.damageType.toUpperCase()}`, 20, 70)
    doc.text(`Square Footage: ${data.squareFeet.toLocaleString()} sq ft`, 20, 77)
    doc.text(`Complexity Level: ${data.complexity.toUpperCase()}`, 20, 84)
    
    doc.setFontSize(9)
    doc.setTextColor(107, 114, 128)
    doc.text(`Estimate Date: ${new Date().toLocaleDateString()}`, 20, 91)
    
    // Breakdown
    doc.setFontSize(11)
    doc.setTextColor(15, 17, 23)
    doc.text('COST BREAKDOWN', 20, 101)
    
    let yPos = 109
    doc.setFontSize(10)
    
    const items = [
      { label: 'Base Labor (@ $65/hr)', value: estimate.labor },
      { label: 'Materials & Supplies', value: estimate.materials },
    ]
    
    if (estimate.additionalServices > 0) {
      items.push({ label: 'Additional Services', value: estimate.additionalServices })
    }
    
    items.push({ label: 'Overhead & Equipment', value: estimate.overhead })
    
    items.forEach((item) => {
      doc.text(item.label, 20, yPos)
      doc.text(`$${item.value.toLocaleString()}`, pageWidth - 50, yPos, { align: 'right' })
      yPos += 7
    })
    
    // Divider
    yPos += 5
    doc.setDrawColor(229, 231, 235)
    doc.setLineWidth(0.5)
    doc.line(20, yPos, pageWidth - 20, yPos)
    
    yPos += 7
    doc.setFontSize(10)
    doc.text('Subtotal', 20, yPos)
    doc.text(`$${estimate.subtotal.toLocaleString()}`, pageWidth - 50, yPos, { align: 'right' })
    
    yPos += 7
    doc.text('Tax (8%)', 20, yPos)
    doc.text(`$${estimate.tax.toLocaleString()}`, pageWidth - 50, yPos, { align: 'right' })
    
    yPos += 10
    doc.setDrawColor(255, 107, 53)
    doc.setLineWidth(1)
    doc.line(20, yPos, pageWidth - 20, yPos)
    
    yPos += 10
    doc.setFontSize(14)
    doc.setTextColor(255, 107, 53)
    doc.setFont(undefined, 'bold')
    doc.text('TOTAL ESTIMATE', 20, yPos)
    doc.text(`$${estimate.total.toLocaleString()}`, pageWidth - 50, yPos, { align: 'right' })
    
    yPos += 20
    doc.setFontSize(8)
    doc.setTextColor(107, 114, 128)
    doc.text('This is a preliminary estimate. Final pricing may vary based on site inspection.', 20, yPos)
    doc.text('SERVPRO is independently owned and operated.', 20, yPos + 5)
    
    doc.save(`SERVPRO-Estimate-${data.damageType}-${Date.now()}.pdf`)
  }

  return (
    <div className="step-container">
      <div className="step-header">
        <h1>Estimated Cost Summary</h1>
        <p>Restoration Services</p>
      </div>

      <div className="estimate-card">
        <div className="estimate-header">
          <div className="damage-type">{data.damageType}</div>
          <div className="sqft-badge">{data.squareFeet.toLocaleString()} sq ft</div>
        </div>

        <div className="breakdown">
          <div className="breakdown-row">
            <span>Base Labor (@ $65/hr)</span>
            <span>${estimate.labor.toLocaleString()}</span>
          </div>
          <div className="breakdown-row">
            <span>Materials & Supplies</span>
            <span>${estimate.materials.toLocaleString()}</span>
          </div>
          {estimate.additionalServices > 0 && (
            <div className="breakdown-row">
              <span>Additional Services</span>
              <span>${estimate.additionalServices.toLocaleString()}</span>
            </div>
          )}
          <div className="breakdown-row">
            <span>Overhead & Equipment</span>
            <span>${estimate.overhead.toLocaleString()}</span>
          </div>

          <div className="breakdown-divider"></div>

          <div className="breakdown-row breakdown-subtotal">
            <span>Subtotal</span>
            <span>${estimate.subtotal.toLocaleString()}</span>
          </div>
          <div className="breakdown-row">
            <span>Tax (8%)</span>
            <span>${estimate.tax.toLocaleString()}</span>
          </div>

          <div className="breakdown-divider"></div>

          <div className="breakdown-row breakdown-total">
            <span>TOTAL ESTIMATE</span>
            <span>${estimate.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="estimate-info">
        <p><strong>Note:</strong> This is a preliminary estimate. Final pricing may vary based on site inspection.</p>
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button className="btn-secondary" onClick={handleExportPDF} style={{ marginRight: 'auto' }}>
          📥 Download PDF
        </button>
        <button className="btn-primary" onClick={() => onNext({})}>
          📧 Send via Email/SMS
        </button>
      </div>
    </div>
  )
}