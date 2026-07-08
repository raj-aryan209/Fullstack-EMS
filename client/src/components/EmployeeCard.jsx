import { PencilIcon, Trash2Icon } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      api.delete(`/employees/${employee.id}`)
      onDelete()
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
    
  };

  return (
    <div className="group relative card card-hover overflow-hidden">
      {/* Avatar Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
        <div className="w-full h-full flex items-center justify-center">
          <div className="size-20 rounded-full bg-gradient-to-br from-indigo-100 to-slate-100 flex items-center justify-center">
            <span className="text-2xl font-semibold text-indigo-500">
              {employee.firstName?.[0]}
              {employee.lastName?.[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Department Badge */}
      <div className="absolute top-3 left-3 flex gap-2">
        <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 shadow-sm">
          {employee.department || "N/A"}
        </span>

        {employee.isDeleted && (
          <span className="bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-medium">
            DELETED
          </span>
        )}
      </div>

      {/* Action Buttons */}
      {!employee.isDeleted && (
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end justify-center pb-6 gap-3">

          <button
            onClick={() => onEdit(employee)}
            className="p-2.5 rounded-xl bg-white shadow-lg hover:text-indigo-600 transition-all hover:scale-105"
          >
            <PencilIcon className="size-4" />
          </button>

          <button
            onClick={handleDelete}
            className="p-2.5 rounded-xl bg-white shadow-lg hover:text-red-600 transition-all hover:scale-105"
          >
            <Trash2Icon className="size-4" />
          </button>

        </div>
      )}

      {/* Employee Details */}
      <div className="p-5 space-y-1">

        <h3 className="text-lg font-semibold text-slate-900">
          {employee.firstName} {employee.lastName}
        </h3>

        <p className="text-sm text-slate-500">
          {employee.position}
        </p>

        <p className="text-sm text-slate-500">
          {employee.email}
        </p>

        <div className="flex justify-between items-center mt-4">

          <span
            className={`text-sm font-semibold ${
              employee.employmentStatus === "ACTIVE"
                ? "text-emerald-600"
                : "text-amber-600"
            }`}
          >
            {employee.employmentStatus}
          </span>

        </div>

      </div>
    </div>
  );
};

export default EmployeeCard;