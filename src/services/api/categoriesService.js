import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoriesService = {
  async getAll() {
    await delay(200);
    return [...categories].sort((a, b) => a.order - b.order);
  },

  async getById(id) {
    await delay(200);
    const category = categories.find(c => c.Id === parseInt(id));
    return category ? { ...category } : null;
  },

  async create(categoryData) {
    await delay(300);
    const maxId = Math.max(...categories.map(c => c.Id), 0);
    const maxOrder = Math.max(...categories.map(c => c.order), 0);
    
    const newCategory = {
      Id: maxId + 1,
      name: categoryData.name,
      color: categoryData.color || "#5B21B6",
      icon: categoryData.icon || "Folder",
      order: maxOrder + 1
    };
    
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updates) {
    await delay(300);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) return null;
    
    categories[index] = { 
      ...categories[index], 
      ...updates,
      Id: parseInt(id)
    };
    
    return { ...categories[index] };
  },

  async delete(id) {
    await delay(200);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) return false;
    categories.splice(index, 1);
    return true;
  },

  async updateOrder(categoryIds) {
    await delay(300);
    categoryIds.forEach((id, index) => {
      const categoryIndex = categories.findIndex(c => c.Id === parseInt(id));
      if (categoryIndex !== -1) {
        categories[categoryIndex].order = index + 1;
      }
    });
    return true;
  }
};