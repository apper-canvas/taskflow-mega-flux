import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ 
  onSearch, 
  onAddTask, 
  onToggleMobileSidebar,
  searchQuery,
  className = "" 
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo and mobile menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ApperIcon name="Menu" className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-display font-bold text-gray-900">
                  TaskFlow
                </h1>
                <p className="text-xs text-gray-500 -mt-1">
                  Stay organized, stay productive
                </p>
              </div>
            </div>
          </div>

          {/* Center section - Search (hidden on mobile) */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <motion.div
              initial={false}
              animate={{ 
                scale: isSearchFocused ? 1.02 : 1,
                y: isSearchFocused ? -1 : 0
              }}
              transition={{ duration: 0.2 }}
            >
              <SearchBar
                placeholder="Search tasks..."
                onSearch={onSearch}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </motion.div>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-3">
            <Button
              onClick={onAddTask}
              className="shadow-lg hover:shadow-xl"
              size="md"
            >
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Add</span>
            </Button>
            
            <div className="hidden lg:flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-400 rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <SearchBar
            placeholder="Search tasks..."
            onSearch={onSearch}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;