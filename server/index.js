require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, message: 'Chat proxy running' }));

app.post('/api/chat', async (req, res) => {
  const { message } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'missing message' });
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    // Fallback reply when no API key present
    return res.json({ reply: `本地代理未配置 OPENAI_API_KEY，收到消息：${message}` });
  }

  try {
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      max_tokens: 600,
      temperature: 0.7,
    };

    const r = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      timeout: 20000,
    });

    const reply = r?.data?.choices?.[0]?.message?.content;
    return res.json({ reply: reply ?? '（无回复内容）' });
  } catch (err) {
    console.error('chat proxy error', err?.response?.data || err.message || err);
    return res.status(500).json({ error: 'chat proxy error', detail: err?.response?.data || err.message });
  }
});

app.listen(port, () => console.log(`Chat proxy listening on ${port}`));
