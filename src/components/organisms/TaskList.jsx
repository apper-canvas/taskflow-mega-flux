import { motion, AnimatePresence } from "framer-motion";
import { sortTasksByDueDateAndPriority } from "@/utils/dateUtils";
import TaskCard from "@/components/molecules/TaskCard";
import EmptyState from "@/components/ui/Empty";

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onArchiveTask,
  loading = false,
  emptyTitle = "No tasks yet",
  emptyMessage = "Create your first task to get started!",
  className = "" 
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-xl h-24"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
        icon="CheckSquare"
      />
    );
  }

  const sortedTasks = sortTasksByDueDateAndPriority(tasks);

  return (
    <div className={`space-y-3 ${className}`}>
      <AnimatePresence mode="popLayout">
        {sortedTasks.map((task) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
          >
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onArchive={onArchiveTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;