import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { tasksService } from "@/services/api/tasksService";
import TaskList from "@/components/organisms/TaskList";
import Button from "@/components/atoms/Button";
import LoadingState from "@/components/ui/Loading";
import ErrorState from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const ArchivePage = () => {
  const { onTaskCountsChange } = useOutletContext();
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    loadArchivedTasks();
  }, []);

  const loadArchivedTasks = async () => {
    try {
      setLoading(true);
      setError("");
      
      const data = await tasksService.getArchived();
      setTasks(data);
    } catch (err) {
      setError("Failed to load archived tasks. Please try again.");
      console.error("Error loading archived tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreTask = async (taskId) => {
    try {
      await tasksService.restore(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task restored successfully");
      onTaskCountsChange?.();
    } catch (err) {
      toast.error("Failed to restore task");
      console.error("Error restoring task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to permanently delete this task?")) return;
    
    try {
      await tasksService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task permanently deleted");
      onTaskCountsChange?.();
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  const handleBulkRestore = async () => {
    if (selectedTasks.length === 0) return;
    
    try {
      await Promise.all(selectedTasks.map(id => tasksService.restore(id)));
      setTasks(prev => prev.filter(t => !selectedTasks.includes(t.Id)));
      setSelectedTasks([]);
      toast.success(`${selectedTasks.length} tasks restored successfully`);
      onTaskCountsChange?.();
    } catch (err) {
      toast.error("Failed to restore tasks");
      console.error("Error restoring tasks:", err);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedTasks.length === 0) return;
    
    if (!window.confirm(`Are you sure you want to permanently delete ${selectedTasks.length} tasks?`)) return;
    
    try {
      await tasksService.bulkDelete(selectedTasks);
      setTasks(prev => prev.filter(t => !selectedTasks.includes(t.Id)));
      setSelectedTasks([]);
      toast.success(`${selectedTasks.length} tasks permanently deleted`);
      onTaskCountsChange?.();
    } catch (err) {
      toast.error("Failed to delete tasks");
      console.error("Error deleting tasks:", err);
    }
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const selectAllTasks = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(t => t.Id));
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={loadArchivedTasks} />;

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
            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center">
              <ApperIcon name="Archive" className="w-6 h-6 text-gray-600" />
            </div>
            
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">
                Archive
              </h1>
              <p className="text-gray-600 mt-1">
                {tasks.length} archived {tasks.length === 1 ? "task" : "tasks"}
              </p>
            </div>
          </div>
          
          {tasks.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={selectAllTasks}
              >
                {selectedTasks.length === tasks.length ? "Deselect All" : "Select All"}
              </Button>
              
              {selectedTasks.length > 0 && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleBulkRestore}
                  >
                    <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
                    Restore ({selectedTasks.length})
                  </Button>
                  
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleBulkDelete}
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                    Delete ({selectedTasks.length})
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Archive Notice */}
      {tasks.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <ApperIcon name="Info" className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                About Archived Tasks
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                These tasks have been archived but not deleted. You can restore them to your active tasks or permanently delete them.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Task List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-3">
          {tasks.map(task => (
            <motion.div
              key={task.Id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task.Id)}
                  onChange={() => toggleTaskSelection(task.Id)}
                  className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Archived on {new Date(task.completedAt || task.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleRestoreTask(task.Id)}
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
                    title="Restore task"
                  >
                    <ApperIcon name="RotateCcw" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.Id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                    title="Permanently delete"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ApperIcon name="Archive" className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No archived tasks
            </h3>
            <p className="text-gray-600">
              Tasks you archive will appear here for easy restoration.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ArchivePage;