import { motion } from "framer-motion";

const Loading = ({ 
  message = "Loading...", 
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full mb-4"
      />
      
      <div className="space-y-4 w-full max-w-md">
        {/* Task card skeletons */}
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded shimmer flex-shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded shimmer w-3/4" />
                <div className="h-3 bg-gray-200 rounded shimmer w-full" />
                <div className="h-3 bg-gray-200 rounded shimmer w-1/2" />
                <div className="flex items-center justify-between mt-3">
                  <div className="h-6 bg-gray-200 rounded-full shimmer w-16" />
                  <div className="h-5 bg-gray-200 rounded shimmer w-12" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 text-sm mt-4"
      >
        {message}
      </motion.p>
    </div>
  );
};

export default Loading;