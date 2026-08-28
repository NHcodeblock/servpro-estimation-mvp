const sgMail = require('@sendgrid/mail')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { name, email, phone, estimate, sendEmail, sendSMS } = JSON.parse(event.body)

    const estimateText = `
SERVPRO Estimate

Customer: ${name}
Damage Type: ${estimate.damageType}
Square Footage: ${estimate.squareFeet.toLocaleString()} sq ft
Complexity: ${estimate.complexity}

COST BREAKDOWN:
Base Labor (@ $65/hr): $${estimate.labor.toLocaleString()}
Materials & Supplies: $${estimate.materials.toLocaleString()}
${estimate.additionalServices > 0 ? `Additional Services: $${estimate.additionalServices.toLocaleString()}` : ''}
Overhead & Equipment: $${estimate.overhead.toLocaleString()}

Subtotal: $${estimate.subtotal.toLocaleString()}
Tax (8%): $${estimate.tax.toLocaleString()}

TOTAL ESTIMATE: $${estimate.total.toLocaleString()}

This is a preliminary estimate. Final pricing may vary based on site inspection.
SERVPRO is independently owned and operated.

Phone: (708) 240-4873
Email: servpro@example.com
    `

    if (sendEmail && email) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      
      const msg = {
        to: email,
        from: 'noreply@servpro-estimation.com',
        subject: `Your SERVPRO Estimate - ${estimate.damageType}`,
        text: estimateText,
      }

      await sgMail.send(msg)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Estimate sent successfully!',
        details: { email: sendEmail, sms: sendSMS }
      })
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}