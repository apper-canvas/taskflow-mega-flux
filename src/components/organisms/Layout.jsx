import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import { categoriesService } from "@/services/api/categoriesService";
import { tasksService } from "@/services/api/tasksService";

const Layout = () => {
  const [categories, setCategories] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    loadCategories();
    loadTaskCounts();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoriesService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadTaskCounts = async () => {
    try {
      const allTasks = await tasksService.getAll();
      const activeTasks = allTasks.filter(task => !task.archived);
      const archivedTasks = allTasks.filter(task => task.archived);
      
      const counts = {
        total: activeTasks.length,
        archived: archivedTasks.length
      };
      
      // Count tasks by category
      activeTasks.forEach(task => {
        counts[task.categoryId] = (counts[task.categoryId] || 0) + 1;
      });
      
      setTaskCounts(counts);
    } catch (error) {
      console.error("Error loading task counts:", error);
    }
  };

  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleCloseMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        categories={categories}
        taskCounts={taskCounts}
        isOpen={isMobileSidebarOpen}
        onClose={handleCloseMobileSidebar}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleMobileSidebar={handleToggleMobileSidebar}
        />
        
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <Outlet context={{ 
              categories, 
              taskCounts, 
              onTaskCountsChange: loadTaskCounts 
            }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;