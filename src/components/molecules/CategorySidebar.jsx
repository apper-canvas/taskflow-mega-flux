import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const CategorySidebar = ({ categories, taskCounts, className = "" }) => {
  return (
    <div className={cn("space-y-1", className)}>
      <NavLink
        to="/"
        className={({ isActive }) => cn(
          "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
          isActive 
            ? "bg-gradient-to-r from-primary-100 to-primary-50 text-primary-900 border border-primary-200" 
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        <div className="flex items-center gap-3">
          <ApperIcon name="List" className="w-4 h-4" />
          <span>All Tasks</span>
        </div>
        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
          {taskCounts?.total || 0}
        </span>
      </NavLink>
      
      <div className="pt-4">
        <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Categories
        </h3>
        
        <div className="space-y-1">
          {categories.map((category) => (
            <motion.div key={category.Id}>
              <NavLink
                to={`/category/${category.Id}`}
                className={({ isActive }) => cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                  isActive 
                    ? "bg-gradient-to-r from-primary-100 to-primary-50 text-primary-900 border border-primary-200" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                  />
                  <ApperIcon name={category.icon} className="w-4 h-4" />
                  <span>{category.name}</span>
                </div>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                  {taskCounts?.[category.Id] || 0}
                </span>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <NavLink
          to="/archive"
          className={({ isActive }) => cn(
            "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
            isActive 
              ? "bg-gradient-to-r from-primary-100 to-primary-50 text-primary-900 border border-primary-200" 
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          )}
        >
          <div className="flex items-center gap-3">
            <ApperIcon name="Archive" className="w-4 h-4" />
            <span>Archive</span>
          </div>
          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
            {taskCounts?.archived || 0}
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default CategorySidebar;