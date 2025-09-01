import { format, isToday, isTomorrow, isPast, parseISO } from "date-fns";

export const formatDueDate = (dateString) => {
  if (!dateString) return null;
  
  const date = typeof dateString === "string" ? parseISO(dateString) : dateString;
  
  if (isToday(date)) {
    return { text: "Today", isOverdue: false, isToday: true };
  }
  
  if (isTomorrow(date)) {
    return { text: "Tomorrow", isOverdue: false, isToday: false };
  }
  
  const isOverdue = isPast(date);
  const text = format(date, "MMM d");
  
  return { text, isOverdue, isToday: false };
};

export const sortTasksByDueDateAndPriority = (tasks) => {
  return [...tasks].sort((a, b) => {
    // Completed tasks go to bottom
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    
    // For uncompleted tasks, sort by priority then due date
    if (!a.completed && !b.completed) {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then by due date (earlier dates first)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;
    }
    
    // Finally by creation order
    return a.order - b.order;
  });
};