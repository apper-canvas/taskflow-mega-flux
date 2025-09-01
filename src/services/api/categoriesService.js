import { toast } from "react-toastify";
import React from "react";

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

const TABLE_NAME = 'category_c';

export const categoriesService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "order_c"}}
        ],
        orderBy: [{"fieldName": "order_c", "sorttype": "ASC"}]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      // Transform database fields to UI format
      return (response.data || []).map(category => ({
        Id: category.Id,
        name: category.name_c || category.Name || '',
        color: category.color_c || '#5B21B6',
        icon: category.icon_c || 'Folder',
        order: category.order_c || 0
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
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
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "order_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);
      
      if (!response?.data) {
        return null;
      }
      
      const category = response.data;
      return {
        Id: category.Id,
        name: category.name_c || category.Name || '',
        color: category.color_c || '#5B21B6',
        icon: category.icon_c || 'Folder',
        order: category.order_c || 0
      };
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      return null;
    }
  },

  async create(categoryData) {
    try {
      const apperClient = getApperClient();
      
      // Only include Updateable fields based on schema
      const params = {
        records: [{
          Name: categoryData.name || '',
          name_c: categoryData.name || '',
          color_c: categoryData.color || '#5B21B6',
          icon_c: categoryData.icon || 'Folder',
          order_c: categoryData.order || 1
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
          console.error(`Failed to create ${failed.length} categories:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          const createdCategory = successful[0].data;
          return {
            Id: createdCategory.Id,
            name: createdCategory.name_c || createdCategory.Name || '',
            color: createdCategory.color_c || '#5B21B6',
            icon: createdCategory.icon_c || 'Folder',
            order: createdCategory.order_c || 0
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
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
      
      if (updates.name !== undefined) {
        updateData.Name = updates.name;
        updateData.name_c = updates.name;
      }
      if (updates.color !== undefined) updateData.color_c = updates.color;
      if (updates.icon !== undefined) updateData.icon_c = updates.icon;
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
          console.error(`Failed to update ${failed.length} categories:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          const updatedCategory = successful[0].data;
          return {
            Id: updatedCategory.Id,
            name: updatedCategory.name_c || updatedCategory.Name || '',
            color: updatedCategory.color_c || '#5B21B6',
            icon: updatedCategory.icon_c || 'Folder',
            order: updatedCategory.order_c || 0
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
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
          console.error(`Failed to delete ${failed.length} categories:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
      return false;
    }
  },

  async updateOrder(categoryIds) {
    try {
      const apperClient = getApperClient();
      
      const records = categoryIds.map((id, index) => ({
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
          console.error(`Failed to update order for ${failed.length} categories:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return response.results.filter(r => r.success).length === categoryIds.length;
      }
      
      return false;
    } catch (error) {
      console.error("Error updating category order:", error);
      toast.error("Failed to update category order");
return false;
    }
  }
};