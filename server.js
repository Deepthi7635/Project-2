const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { User } = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ POST: Save stress level
app.post('/users', async (req, res) => {
  try {
    console.log('Received:', req.body); // move inside route
    const { name, stressLevel } = req.body;
    if (!name || !stressLevel) {
      return res.status(400).json({ error: 'Missing name or stress level' });
    }
    const user = await User.create({ name, stressLevel });
    res.json({ message: 'Saved successfully!', user });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET: Fetch all records
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ order: [['id', 'DESC']] });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('🚀 Backend running at http://localhost:3000'));
