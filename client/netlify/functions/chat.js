exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { message, code, language } = JSON.parse(event.body)

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://nixon-nexcode.netlify.app',
        'X-Title': 'NexCode IDE'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        max_tokens: 1024,
        messages: [
          {
            role: 'system',
            content: 'You are an expert coding assistant inside NexCode IDE. Be concise and helpful. When writing code always wrap it in triple backticks with the language name.'
          },
          {
            role: 'user',
            content: `Language: ${language}\n\nCurrent code:\n\`\`\`${language}\n${code}\n\`\`\`\n\nUser question: ${message}`
          }
        ]
      })
    })

    const data = await response.json()
    
    if (!data.choices || !data.choices[0]) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: 'Error: ' + JSON.stringify(data) })
      }
    }

    const reply = data.choices[0].message.content.trim()

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    }
  } catch(err) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: 'Error: ' + err.message })
    }
  }
}
