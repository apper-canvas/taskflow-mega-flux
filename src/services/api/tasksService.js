import { toast } from "react-toastify";

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

const TABLE_NAME = 'task_c';

// Transform database task to UI format
const transformTaskFromDB = (dbTask) => ({
  Id: dbTask.Id,
  title: dbTask.title_c || dbTask.Name || '',
  description: dbTask.description_c || '',
  categoryId: dbTask.category_id_c?.Id ? dbTask.category_id_c.Id.toString() : (dbTask.category_id_c ? dbTask.category_id_c.toString() : ''),
  priority: dbTask.priority_c || 'medium',
  dueDate: dbTask.due_date_c || null,
  completed: dbTask.completed_c || false,
  completedAt: dbTask.completed_at_c || null,
  archived: dbTask.archived_c || false,
  createdAt: dbTask.created_at_c || dbTask.CreatedOn || new Date().toISOString(),
  order: dbTask.order_c || 0
});

export const tasksService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_id_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "archived_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "order_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        orderBy: [{"fieldName": "order_c", "sorttype": "ASC"}]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return (response.data || []).map(transformTaskFromDB);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_id_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "archived_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "order_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      };
      
      const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);
      
      if (!response?.data) {
        return null;
      }
      
      return transformTaskFromDB(response.data);
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      return null;
    }
  },

  async getByCategory(categoryId) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_id_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "archived_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "order_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        where: [{"FieldName": "category_id_c", "Operator": "EqualTo", "Values": [parseInt(categoryId)]}],
        orderBy: [{"fieldName": "order_c", "sorttype": "ASC"}]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return (response.data || []).map(transformTaskFromDB);
    } catch (error) {
      console.error("Error fetching tasks by category:", error);
      return [];
    }
  },

  async getArchived() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_id_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "archived_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "order_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        where: [{"FieldName": "archived_c", "Operator": "EqualTo", "Values": [true]}],
        orderBy: [{"fieldName": "order_c", "sorttype": "ASC"}]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return (response.data || []).map(transformTaskFromDB);
    } catch (error) {
      console.error("Error fetching archived tasks:", error);
      return [];
    }
  },

  async getActive() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_id_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "archived_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "order_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        where: [{"FieldName": "archived_c", "Operator": "EqualTo", "Values": [false]}],
        orderBy: [{"fieldName": "order_c", "sorttype": "ASC"}]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return (response.data || []).map(transformTaskFromDB);
    } catch (error) {
      console.error("Error fetching active tasks:", error);
      return [];
    }
  },

  async create(taskData) {
    try {
      const apperClient = getApperClient();
      
      // Only include Updateable fields based on schema
      const params = {
        records: [{
          Name: taskData.title || '',
          title_c: taskData.title || '',
          description_c: taskData.description || '',
          category_id_c: taskData.categoryId ? parseInt(taskData.categoryId) : null,
          priority_c: taskData.priority || 'medium',
          due_date_c: taskData.dueDate || null,
          completed_c: false,
          completed_at_c: null,
          archived_c: false,
          created_at_c: new Date().toISOString(),
          order_c: Date.now() // Simple ordering
        }]
      };
      
      const response = await apperClient.createRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} tasks:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          return transformTaskFromDB(successful[0].data);
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
      return null;
    }
  },

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      
      // Only include Updateable fields
      const updateData = {
        Id: parseInt(id)
      };
      
      if (updates.title !== undefined) {
        updateData.Name = updates.title;
        updateData.title_c = updates.title;
      }
      if (updates.description !== undefined) updateData.description_c = updates.description;
      if (updates.categoryId !== undefined) updateData.category_id_c = updates.categoryId ? parseInt(updates.categoryId) : null;
      if (updates.priority !== undefined) updateData.priority_c = updates.priority;
      if (updates.dueDate !== undefined) updateData.due_date_c = updates.dueDate;
      if (updates.completed !== undefined) {
        updateData.completed_c = updates.completed;
        updateData.completed_at_c = updates.completed ? new Date().toISOString() : null;
      }
      if (updates.archived !== undefined) updateData.archived_c = updates.archived;
      if (updates.order !== undefined) updateData.order_c = updates.order;
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} tasks:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          return transformTaskFromDB(successful[0].data);
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} tasks:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
      return false;
    }
  },

  async toggleComplete(id) {
    try {
      // First get the current task
      const currentTask = await this.getById(id);
      if (!currentTask) return null;
      
      // Update with toggled completion status
      return await this.update(id, {
        completed: !currentTask.completed
      });
    } catch (error) {
      console.error("Error toggling task completion:", error);
      toast.error("Failed to update task");
      return null;
    }
  },

  async archive(id) {
    try {
      return await this.update(id, { archived: true });
    } catch (error) {
      console.error("Error archiving task:", error);
      toast.error("Failed to archive task");
      return null;
    }
  },

  async restore(id) {
    try {
      return await this.update(id, { archived: false });
    } catch (error) {
      console.error("Error restoring task:", error);
      toast.error("Failed to restore task");
      return null;
    }
  },

  async bulkDelete(ids) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        RecordIds: ids.map(id => parseInt(id))
      };
      
      const response = await apperClient.deleteRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} tasks:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return response.results.filter(r => r.success).length === ids.length;
      }
      
      return false;
    } catch (error) {
      console.error("Error bulk deleting tasks:", error);
      toast.error("Failed to delete tasks");
      return false;
    }
  },

  async search(query) {
    try {
      const apperClient = getApperClient();
      const searchTerm = query.toLowerCase().trim();
      
      if (!searchTerm) {
        return await this.getAll();
      }
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_id_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "archived_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "order_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "title_c", "operator": "Contains", "values": [searchTerm]},
                {"fieldName": "description_c", "operator": "Contains", "values": [searchTerm]}
              ],
              "operator": "OR"
            }
          ]
        }],
        orderBy: [{"fieldName": "order_c", "sorttype": "ASC"}]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return (response.data || []).map(transformTaskFromDB);
    } catch (error) {
      console.error("Error searching tasks:", error);
      return [];
    }
  },

  async updateOrder(taskIds) {
    try {
      const apperClient = getApperClient();
      
      const records = taskIds.map((id, index) => ({
        Id: parseInt(id),
        order_c: index + 1
      }));
      
      const params = { records };
      
      const response = await apperClient.updateRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update order for ${failed.length} tasks:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return response.results.filter(r => r.success).length === taskIds.length;
      }
      
      return false;
    } catch (error) {
      console.error("Error updating task order:", error);
      toast.error("Failed to update task order");
      return false;
    }
  }
};