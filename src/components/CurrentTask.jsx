import { useEffect } from "react";
import { editTask, fetchTasks } from "../store/api/TaskSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const CurrentTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  //
  const markAsUnComplete = (task) => {
    dispatch(
      editTask({
        id: task.id,
        updatedTask: { ...task, status: "completed" },
      })
    );
  };

  return (
    <div className="  px-2 py-3 my-2 flex flex-col items-center justify-center">
      <div className="w-full text-start md:text-center my-2 ">
        <h2 className=" text-2xl font-semibold text-gray-500 tracking-wide">
          My Tasks :
        </h2>
      </div>
      <table className="w-full sm:w-2/3 px-2 bg-white border-collapse rounded-2xl shadow-lg">
        <thead className="bg-linear-to-r from-indigo-300 to-indigo-600 text-white rounded">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:px-6 sm:py-4">
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-600 bg-indigo-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:px-6 sm:py-4">
              Title
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:px-6 sm:py-4">
              Priority
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:px-6 sm:py-4 hidden md:table-cell">
              Created Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:px-6 sm:py-4  lg:table-cell">
              Due Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:px-6 sm:py-4">
              Status
            </th>
          </tr>
        </thead>
        {tasks &&
          tasks
            .filter((task) => task.status === "pending")
            .map((task, index) => (
              <tbody key={index} className="bg-white divide-y divide-gray-200">
                {/* Table rows will be added here */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap sm:px-6 sm:py-4">
                    <input
                      onChange={() => markAsUnComplete(task)}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 sm:px-6 sm:py-4">
                    {task.title}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap sm:px-6 sm:py-4">
                    <span
                      className={
                        task.priority === "High"
                          ? "px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"
                          : task.priority === "Medium"
                          ? "px-2 py-1 text-xs font-semibold rounded-full bg-yellow-300 text-yellow-600"
                          : "px-2 py-1 text-xs font-semibold rounded-full bg-green-300 text-green-600"
                      }
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap sm:px-6 sm:py-4 hidden md:table-cell">
                    {moment(task.createdAt).format("MM-DD-YYYY")}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap sm:px-6 sm:py-4  lg:table-cell">
                    {moment(task.dueDate).format("MM-DD-YYYY")}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap sm:px-6 sm:py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {task.status}...
                    </span>
                  </td>
                </tr>
              </tbody>
            ))}
      </table>
    </div>
  );
};

export default CurrentTask;
