import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { tasksService } from "@/services/api/tasksService";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/organisms/TaskModal";
import FilterBar from "@/components/molecules/FilterBar";
import Button from "@/components/atoms/Button";
import LoadingState from "@/components/ui/Loading";
import ErrorState from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const TasksPage = () => {
  const { categoryId } = useParams();
  const { categories, onTaskCountsChange } = useOutletContext();
  
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    dueDate: ""
  });
  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [categoryId]);

  useEffect(() => {
    applyFilters();
  }, [tasks, searchQuery, filters]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      
      let data;
      if (categoryId) {
        data = await tasksService.getByCategory(categoryId);
      } else {
        data = await tasksService.getActive();
      }
      
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...tasks];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }
    
    // Apply priority filter
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }
    
    // Apply status filter
    if (filters.status) {
      if (filters.status === "completed") {
        filtered = filtered.filter(task => task.completed);
      } else if (filters.status === "pending") {
        filtered = filtered.filter(task => !task.completed);
      }
    }
    
    // Apply due date filter
    if (filters.dueDate) {
      const filterDate = new Date(filters.dueDate).toDateString();
      filtered = filtered.filter(task => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate).toDateString();
        return taskDate === filterDate;
      });
    }
    
    setFilteredTasks(filtered);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSubmitTask = async (taskData) => {
    try {
      setIsSubmitting(true);
      
      if (editingTask) {
        const updatedTask = await tasksService.update(editingTask.Id, taskData);
        setTasks(prev => prev.map(t => t.Id === editingTask.Id ? updatedTask : t));
        toast.success("Task updated successfully!");
      } else {
        const newTask = await tasksService.create({
          ...taskData,
          categoryId: categoryId || taskData.categoryId
        });
        setTasks(prev => [...prev, newTask]);
        toast.success("Task created successfully!");
      }
      
      setIsTaskModalOpen(false);
      onTaskCountsChange?.();
    } catch (err) {
      toast.error("Failed to save task. Please try again.");
      console.error("Error saving task:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await tasksService.toggleComplete(taskId);
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t));
      
      if (updatedTask.completed) {
        toast.success("Task completed! 🎉");
      } else {
        toast.info("Task marked as pending");
      }
      
      onTaskCountsChange?.();
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error toggling task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await tasksService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully");
      onTaskCountsChange?.();
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  const handleArchiveTask = async (taskId) => {
    try {
      await tasksService.archive(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task archived successfully");
      onTaskCountsChange?.();
    } catch (err) {
      toast.error("Failed to archive task");
      console.error("Error archiving task:", err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      priority: "",
      status: "",
      dueDate: ""
    });
    setSearchQuery("");
  };

  const getCurrentCategory = () => {
    if (!categoryId) return null;
    return categories.find(c => c.Id.toString() === categoryId);
  };

  const currentCategory = getCurrentCategory();
  const hasActiveFilters = searchQuery || filters.priority || filters.status || filters.dueDate;

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={loadTasks} />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentCategory && (
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${currentCategory.color}20` }}
              >
                <ApperIcon 
                  name={currentCategory.icon} 
                  className="w-6 h-6"
                  style={{ color: currentCategory.color }}
                />
              </div>
            )}
            
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">
                {currentCategory ? currentCategory.name : "All Tasks"}
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </div>
          
          <Button
            onClick={handleAddTask}
            className="shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </motion.div>

      {/* Task List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onArchiveTask={handleArchiveTask}
          emptyTitle={hasActiveFilters ? "No matching tasks" : "No tasks yet"}
          emptyMessage={
            hasActiveFilters 
              ? "Try adjusting your search or filters" 
              : "Create your first task to get started!"
          }
        />
      </motion.div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        task={editingTask}
        categories={categories}
        onSubmit={handleSubmitTask}
        loading={isSubmitting}
      />
    </div>
  );
};

export default TasksPage;