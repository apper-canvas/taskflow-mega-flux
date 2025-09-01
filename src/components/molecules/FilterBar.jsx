import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  className = "" 
}) => {
  const priorityOptions = [
    { value: "", label: "All Priorities" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" }
  ];

  const statusOptions = [
    { value: "", label: "All Tasks" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" }
  ];

  const hasActiveFilters = filters.priority || filters.status || filters.dueDate;

  return (
    <div className={cn("flex items-center gap-4 p-4 bg-gray-50 rounded-lg", className)}>
      <div className="flex items-center gap-2">
        <ApperIcon name="Filter" className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <select
        value={filters.priority || ""}
        onChange={(e) => onFilterChange?.({ ...filters, priority: e.target.value })}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {priorityOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <select
        value={filters.status || ""}
        onChange={(e) => onFilterChange?.({ ...filters, status: e.target.value })}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {statusOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <input
        type="date"
        value={filters.dueDate || ""}
        onChange={(e) => onFilterChange?.({ ...filters, dueDate: e.target.value })}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder="Due date"
      />
      
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ApperIcon name="X" className="w-4 h-4" />
          Clear
        </button>
      )}
    </div>
  );
};

export default FilterBar;