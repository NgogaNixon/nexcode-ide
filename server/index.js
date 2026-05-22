const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/chat', async (req, res) => {
  const { message, code, language } = req.body

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`,
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
    const reply = data.choices[0].message.content.trim()
    res.json({ reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ reply: 'Error reaching AI. Please try again.' })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))