import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import CategorySidebar from "@/components/molecules/CategorySidebar";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ 
  categories, 
  taskCounts, 
  isOpen = false, 
  onClose,
  className = "" 
}) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:block w-64 bg-white border-r border-gray-200 h-full",
        className
      )}>
        <div className="p-6 h-full overflow-y-auto custom-scrollbar">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Navigation
            </h2>
          </div>
          
          <CategorySidebar 
            categories={categories} 
            taskCounts={taskCounts}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={onClose}
            />

            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-white z-50 shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-500 rounded-lg flex items-center justify-center">
                    <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="font-display font-bold text-gray-900">
                      TaskFlow
                    </h1>
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 h-full overflow-y-auto custom-scrollbar">
                <CategorySidebar 
                  categories={categories} 
                  taskCounts={taskCounts}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;