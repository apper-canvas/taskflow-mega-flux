export const useKeyboardShortcuts = (callbacks) => {
  const handleKeyDown = (event) => {
    // Cmd/Ctrl + N - Add new task
    if ((event.metaKey || event.ctrlKey) && event.key === "n") {
      event.preventDefault();
      callbacks.onAddTask?.();
    }
    
    // Cmd/Ctrl + Enter - Mark task complete (when task is selected)
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      callbacks.onCompleteTask?.();
    }
    
    // Delete/Backspace - Delete selected task
    if ((event.key === "Delete" || event.key === "Backspace") && !event.target.closest("input, textarea")) {
      event.preventDefault();
      callbacks.onDeleteTask?.();
    }
    
    // Escape - Close modals/clear selection
    if (event.key === "Escape") {
      callbacks.onEscape?.();
    }
    
    // Cmd/Ctrl + / - Focus search
    if ((event.metaKey || event.ctrlKey) && event.key === "/") {
      event.preventDefault();
      callbacks.onFocusSearch?.();
    }
  };
  
  return { handleKeyDown };
};