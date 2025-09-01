import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import TaskForm from "@/components/molecules/TaskForm";

const TaskModal = ({ 
  isOpen, 
  onClose, 
  task, 
  categories, 
  onSubmit,
  loading = false
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className={cn(
            "relative w-full max-w-lg bg-white rounded-2xl shadow-xl",
            "max-h-[90vh] overflow-hidden"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-display font-semibold text-gray-900">
                {task ? "Edit Task" : "Create New Task"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {task ? "Update your task details" : "Add a new task to stay organized"}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={loading}
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
            <TaskForm
              task={task}
              categories={categories}
              onSubmit={onSubmit}
              onCancel={onClose}
              loading={loading}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;