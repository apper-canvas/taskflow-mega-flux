import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const tasksService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async getByCategory(categoryId) {
    await delay(300);
    return tasks.filter(t => t.categoryId === categoryId.toString()).map(t => ({ ...t }));
  },

  async getArchived() {
    await delay(300);
    return tasks.filter(t => t.archived).map(t => ({ ...t }));
  },

  async getActive() {
    await delay(300);
    return tasks.filter(t => !t.archived).map(t => ({ ...t }));
  },

  async create(taskData) {
    await delay(400);
    const maxId = Math.max(...tasks.map(t => t.Id), 0);
    const newTask = {
      Id: maxId + 1,
      title: taskData.title,
      description: taskData.description || "",
      categoryId: taskData.categoryId,
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      completed: false,
      completedAt: null,
      archived: false,
      createdAt: new Date().toISOString(),
      order: maxId + 1
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;
    
    tasks[index] = { 
      ...tasks[index], 
      ...updates,
      Id: parseInt(id)
    };
    
    // If marking as completed, set completedAt timestamp
    if (updates.completed && !tasks[index].completedAt) {
      tasks[index].completedAt = new Date().toISOString();
    }
    
    // If marking as incomplete, clear completedAt
    if (updates.completed === false) {
      tasks[index].completedAt = null;
    }
    
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },

  async toggleComplete(id) {
    await delay(250);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;
    
    tasks[index].completed = !tasks[index].completed;
    tasks[index].completedAt = tasks[index].completed ? new Date().toISOString() : null;
    
    return { ...tasks[index] };
  },

  async archive(id) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;
    
    tasks[index].archived = true;
    return { ...tasks[index] };
  },

  async restore(id) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;
    
    tasks[index].archived = false;
    return { ...tasks[index] };
  },

  async bulkDelete(ids) {
    await delay(500);
    const idsArray = ids.map(id => parseInt(id));
    tasks = tasks.filter(t => !idsArray.includes(t.Id));
    return true;
  },

  async search(query) {
    await delay(300);
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return [...tasks];
    
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    ).map(t => ({ ...t }));
  },

  async updateOrder(taskIds) {
    await delay(300);
    taskIds.forEach((id, index) => {
      const taskIndex = tasks.findIndex(t => t.Id === parseInt(id));
      if (taskIndex !== -1) {
        tasks[taskIndex].order = index + 1;
      }
    });
    return true;
  }
};