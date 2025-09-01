import { useState } from "react";
import { format } from "date-fns";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";

const TaskForm = ({ 
  task, 
  categories, 
  onSubmit, 
  onCancel,
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    categoryId: task?.categoryId || (categories[0]?.Id.toString() || ""),
    priority: task?.priority || "medium",
    dueDate: task?.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const submitData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    };
    
    await onSubmit?.(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField 
        label="Task Title" 
        error={errors.title}
        required
      >
        <Input
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter task title..."
          error={!!errors.title}
        />
      </FormField>

      <FormField label="Description">
        <Textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Add a description..."
          rows={3}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          label="Category" 
          error={errors.categoryId}
          required
        >
          <Select
            value={formData.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            error={!!errors.categoryId}
          >
            {categories.map(category => (
              <option key={category.Id} value={category.Id.toString()}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Priority">
          <Select
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormField>
      </div>

      <FormField label="Due Date">
        <Input
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
        />
      </FormField>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
        >
          {task ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;