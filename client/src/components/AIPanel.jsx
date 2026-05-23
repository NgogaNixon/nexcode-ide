import { useState, useEffect } from 'react'

function AIPanel({ code, language, autoPrompt, clearAutoPrompt }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your AI coding assistant. Ask me anything about your code!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (autoPrompt && autoPrompt.trim() !== '') {
      const prompt = autoPrompt
      clearAutoPrompt()
      sendMessage(prompt)
    }
  }, [autoPrompt])

  const sendMessage = async (msg) => {
    const userMsg = msg || input.trim()
    if (!userMsg) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, code, language })
      })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Error reaching AI. Please try again.' }])
    }
    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0e1018' }}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' ? '#1c2030' : '#003344',
            border: `1px solid ${msg.role === 'user' ? '#3a4060' : '#00d4ff'}`,
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '13px',
            maxWidth: '85%',
            color: '#ffffff',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            {msg.role === 'ai' && (
              <div style={{
                fontSize: '11px',
                color: '#00d4ff',
                fontWeight: 700,
                marginBottom: '6px',
                letterSpacing: '.08em'
              }}>
                NEXCODE AI
              </div>
            )}
            {msg.text}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', color: '#00d4ff', fontSize: '13px', padding: '8px 0' }}>
            AI is thinking...
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        gap: '10px',
        padding: '12px 16px',
        borderTop: '2px solid #00d4ff',
        background: '#141720'
      }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask the AI about your code..."
          style={{
            flex: 1,
            background: '#0a0c10',
            border: '2px solid #00d4ff',
            color: '#ffffff',
            padding: '10px 14px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px',
            outline: 'none'
          }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading}
          style={{
            background: '#00d4ff',
            color: '#0a0c10',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '13px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default AIPanel