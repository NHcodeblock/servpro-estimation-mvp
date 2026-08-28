exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const apiKey = process.env.SENDGRID_API_KEY
    console.log('API Key present:', !!apiKey)
    console.log('API Key length:', apiKey ? apiKey.length : 0)

    const { name, email, phone, estimate, sendEmail, sendSMS } = JSON.parse(event.body)

    if (sendEmail && email) {
      console.log('Attempting to send email to:', email)
      console.log('Using API key:', apiKey ? 'YES' : 'NO')
      
      // Just return success for now
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Test successful - function works!'
        })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}