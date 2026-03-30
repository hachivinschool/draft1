// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from 'openai';
import lessons from '../data/lessons.json' assert { type: "json" };

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

// API lấy danh sách bài học
app.get('/api/lessons', (req, res) => res.json(lessons));

// API chat AI
app.post('/api/ask', async (req, res) => {
  const { question } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: "Bạn là trợ lý học lập trình Python cho học sinh." },
        { role: "user", content: question }
      ],
    });
    res.json({ answer: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API lưu project
let projects = {};
app.post('/api/saveProject', (req, res) => {
  const { name, code } = req.body;
  projects[name] = code;
  res.json({ success: true });
});

// API load project
app.get('/api/loadProject/:name', (req, res) => {
  const { name } = req.params;
  res.json({ code: projects[name] || '' });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
