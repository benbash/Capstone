let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = 'mongodb://localhost:27017/taskMaster';

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Task Schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  priority: String
});
const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
