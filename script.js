
    // Base API URL
    const API_URL = 'http://localhost:3000/tasks';

    // Fetch tasks from the backend
    async function fetchTasks() {
      try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        displayTasks(tasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    }

    // Display tasks on the page
    function displayTasks(tasks) {
      const taskContainer = document.getElementById('tasks');
      taskContainer.innerHTML = '';
      tasks.forEach(task => {
        const taskEl = document.createElement('div');
        taskEl.className = 'task';
        taskEl.innerHTML = `
          <h3>${task.title} (${task.priority.toUpperCase()})</h3>
          <p>${task.description}</p>
          <p>Deadline: ${new Date(task.deadline).toLocaleDateString()}</p>
          <p class="delete" onclick="deleteTask('${task._id}')">Delete</p>
        `;
        taskContainer.appendChild(taskEl);
      });
    }

    // Add a new task
    document.getElementById('taskForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const deadline = document.getElementById('deadline').value;
      const priority = document.getElementById('priority').value;

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description, deadline, priority })
        });
        if (response.ok) {
          fetchTasks();
          e.target.reset();
        }
      } catch (err) {
        console.error('Error adding task:', err);
      }
    });

    // Delete a task
    async function deleteTask(id) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchTasks();
        }
      }
      catch (err) {
        console.error('Error deleting task:', err);
      }
    }

    // Initial fetch
    fetchTasks();
  
