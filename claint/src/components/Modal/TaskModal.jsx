import React from "react";

function TaskModal({ task, setShowModal }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[90%] max-w-lg bg-white text-gray-900 rounded-lg shadow-lg p-6">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={() => setShowModal(false)}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Task Content */}
        <div className="flex flex-col gap-4">
          {/* Task Title */}
          <h1 className="text-xl font-bold text-indigo-700">{task.title}</h1>

          {/* Task Description */}
          <p className="text-gray-800 text-base">{task.description}</p>

          {/* Status Badge */}
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              task.status === "completed"
                ? "bg-green-500 text-white"
                : "bg-yellow-400 text-gray-900"
            }`}
          >
            {task.status}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-6 text-right">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
