import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { formatDueDate } from "@/utils/dateUtils";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Checkbox from "@/components/atoms/Checkbox";

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  onArchive,
  className = "" 
}) => {
  const [isCompleting, setIsCompleting] = useState(false);
  
  const dueDateInfo = task.dueDate ? formatDueDate(task.dueDate) : null;
  
  const handleToggleComplete = async () => {
    setIsCompleting(true);
    await onToggleComplete?.(task.Id);
    setIsCompleting(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, x: 100 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200",
        task.completed && "opacity-75 bg-gray-50",
        isCompleting && "animate-pulse",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={isCompleting}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={cn(
              "font-medium text-gray-900 line-clamp-2",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={cn(
                "w-2 h-2 rounded-full",
                getPriorityColor(task.priority),
                task.priority === "high" && "priority-high"
              )} />
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <button
                  onClick={() => onEdit?.(task)}
                  className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <ApperIcon name="Edit2" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onArchive?.(task.Id)}
                  className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
                >
                  <ApperIcon name="Archive" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete?.(task.Id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {task.description && (
            <p className={cn(
              "text-sm text-gray-600 mb-3 line-clamp-2",
              task.completed && "text-gray-400"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={task.priority} size="sm">
                {task.priority}
              </Badge>
            </div>
            
            {dueDateInfo && (
              <div className={cn(
                "text-xs font-medium px-2 py-1 rounded-md",
                dueDateInfo.isOverdue 
                  ? "text-red-700 bg-red-100" 
                  : dueDateInfo.isToday 
                  ? "text-accent-700 bg-accent-100" 
                  : "text-gray-600 bg-gray-100"
              )}>
                {dueDateInfo.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;