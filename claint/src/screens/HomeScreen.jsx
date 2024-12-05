import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, updateTaskStatus, deleteTask } from "../api";
import TaskModal from "../components/Modal/TaskModal.jsx";
import { Autocomplete, TextField } from "@mui/material";

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const fetchedTasks = await getTasks(token);
        setTasks(fetchedTasks);
        setFilteredTasks(fetchedTasks);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const filterTasks = () => {
      const filtered = tasks.filter((task) => {
        const matchesStatus = !status || task.status === status;
        const matchesPriority = !priority || task.priority === priority;
        return matchesStatus && matchesPriority;
      });
      setFilteredTasks(filtered);
    };
    filterTasks();
  }, [tasks, priority, status]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleTaskStatusChange = async (taskId) => {
    const token = localStorage.getItem("token");
    if (token) {
      await updateTaskStatus(taskId, token);
      const updatedTasks = await getTasks(token);
      setTasks(updatedTasks);
    }
  };

  const handleTaskDelete = async (taskId) => {
    const token = localStorage.getItem("token");
    if (token) {
      await deleteTask(taskId, token);
      const updatedTasks = await getTasks(token);
      setTasks(updatedTasks);
    }
  };

  const resetFilters = () => {
    setPriority("");
    setStatus("");
    setFilteredTasks(tasks);
  };

  const statusOptions = ["completed", "pending"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold">Tasks</h1>
          <div className="flex items-center space-x-4">
            {/* Filters */}
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={resetFilters}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Reset
            </button>
            <button
              onClick={() => navigate("/task")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            >
              Create Task
            </button>
          </div>
        </div>

        {/* Task Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6">
          <table className="min-w-full text-gray-900">
            <thead>
              <tr className="border-b text-sm font-semibold">
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Due Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Priority</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 text-center text-lg text-gray-500"
                  >
                    No tasks available
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b hover:bg-gray-100 transition-colors"
                  >
                    <td
                      className="py-3 px-4 cursor-pointer"
                      onClick={() => handleTaskClick(task)}
                    >
                      {task.title}
                    </td>
                    <td className="py-3 px-4">{task.due_date.slice(0, 10)}</td>
                    <td className="py-3 px-4">
                      <Autocomplete
                        size="small"
                        options={statusOptions}
                        value={task.status}
                        onChange={() => handleTaskStatusChange(task._id)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            className="bg-gray-800 text-white rounded-lg"
                          />
                        )}
                      />
                    </td>
                    <td className={`py-3 px-4 font-bold text-${task.priority}`}>
                      {task.priority}
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded-lg"
                        onClick={() => handleTaskClick(task)}
                      >
                        View
                      </button>
                      <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-2 rounded-lg"
                        onClick={() => navigate(`/task/${task._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskDelete(task._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Modal */}
      {showModal && (
        <TaskModal setShowModal={setShowModal} task={selectedTask} />
      )}
    </div>
  );
};

export default HomeScreen;
