import { forwardRef } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteTaskMutation,
  useGetBoardByProjectIdQuery,
  useGetTasksByProjectIdQuery,
} from "./tasksSlice";
import { Draggable } from "@hello-pangea/dnd";
import DropDownMenu from "../../components/DropdownMenu";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteSyncTask } from "./boardSlice";

const TaskCard = ({ handleEditTaskButton, index, taskKey }) => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const {
    refetch: refetchBoard,
    isLoading: isBoardLoading,
    isSuccess: isBoardLoaded,
  } = useGetBoardByProjectIdQuery(projectId);

  //sort task by key
  // const { task } = useGetTasksByProjectIdQuery(projectId, {
  //   selectFromResult: ({ data }) => ({
  //     task: data?.entities[taskId],
  //   }),
  // });

  const { task } = useGetTasksByProjectIdQuery(projectId, {
    selectFromResult: ({ data }) => ({
      task: Object.values(data?.entities).find((task) => task.key === taskKey),
    }),
  });

  const [deleteTask] = useDeleteTaskMutation();

  const handleDeleteTaskButton = async () => {
    try {
      await dispatch(
        deleteSyncTask({ sourceColId: task?.column, taskId: task?.id })
      );
      await deleteTask({ taskId: task?.id }).unwrap();
      await refetchBoard();
    } catch (err) {
      console.error("Failed to delete task.", err);
    }
  };

  return (
    <Draggable draggableId={taskKey} key={taskKey} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className="p-6 mb-4 bg-white rounded shadow"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/**task status?? */}
          <div className="flex justify-between items-center mb-6 ">
            <span className="inline-block py-1 px-2 bg-blue-50 text-xs text-blue-500 rounded-full">
              Priority Tag
            </span>
            <div>
              <DropDownMenu
                handleEditButton={handleEditTaskButton}
                handleDeleteButton={handleDeleteTaskButton}
              />
            </div>
          </div>
          {/**task data display */}
          <div className="mb-4" onClick={handleEditTaskButton}>
            <h3 className="mb-2 font-medium">{task?.name}</h3>
            <p className="text-sm text-gray-500">ID: {task?.id}</p>
            <p className="text-sm text-gray-500">Key: {task?.key}</p>
          </div>
          {/**misc data like name, data created, due date */}
          <div className="flex justify-between">
            <div className="flex items-center">
              {/* <img className="w-8 h-8 rounded-full object-cover object-right" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt="">
              <img className="w-8 h-8 -ml-2 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt="">
              <img className="w-8 h-8 -ml-2 rounded-full object-cover object-top" src="https://images.unsplash.com/photo-1528936466093-76ffdfcf7a40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80" alt=""> */}
              <div className="inline-flex -ml-2 items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-xs font-medium text-indigo-500">
                +3
              </div>
            </div>
            <div className="flex">
              <a className="flex items-center text-xs text-gray-500" href="#">
                <span className="mr-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 23 23"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </span>
                <span>Last updated {moment(task?.updatedAt).fromNow()}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
