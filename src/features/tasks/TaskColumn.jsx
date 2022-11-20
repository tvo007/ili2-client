import { Draggable, Droppable } from "@hello-pangea/dnd";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentBoard } from "./boardSlice";
import { useGetColumnsByProjectIdQuery } from "./columnsSlice";
import TaskCard from "./TaskCard";

const TaskColumn = ({ colId, handleEditTaskButton, handleAddTaskButton }) => {
  const { projectId } = useParams();
  const boardColumn = useSelector(selectCurrentBoard).order?.columns.find(
    (col) => col.id === colId
  );

  //get single column details
  const { column } = useGetColumnsByProjectIdQuery(projectId, {
    selectFromResult: ({ data }) => ({
      column: data.entities[colId],
    }),
  });

  // console.log(column);

  return (
    <div className="w-full lg:w-1/3 p-4">
      {/**column header */}
      <div className="pt-3 px-6 mb-6 bg-white rounded border-t-4 border-indigo-500 shadow">
        <div className="flex justify-between items-center pb-3">
          <h3 className="font-medium">{column.name}</h3>
          <span className="flex justify-center items-center w-6 h-6 rounded bg-indigo-50 text-indigo-500 text-xs">
            {boardColumn?.order.length}
          </span>
        </div>
      </div>
      {/**column content */}
      <div>
        <Droppable droppableId={colId} type="div">
          {(provided) => (
            <div ref={provided.innerRef}>
              {boardColumn?.order
                ?.map((task, index) => (
                  <TaskCard
                    key={task.key}
                    index={index}
                    taskKey={task.key}
                    handleEditTaskButton={() => handleEditTaskButton(task.key)}
                  />
                ))
                .sort((a, b) => a.position - b.position)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {column.name === "Todo" && (
          <button
            className="flex justify-center items-center 
          py-3 border-2 border-gray-200 border-dashed hover:border-gray-500 rounded 
          text-sm text-gray-300 hover:text-gray-500 min-w-full"
            onClick={handleAddTaskButton}
          >
            <span className="mr-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6667 5.33335H6.66675V1.33335C6.66675 1.15654 6.59651 0.986974 6.47149 0.861949C6.34646 0.736925 6.17689 0.666687 6.00008 0.666687C5.82327 0.666687 5.6537 0.736925 5.52868 0.861949C5.40365 0.986974 5.33341 1.15654 5.33341 1.33335V5.33335H1.33341C1.1566 5.33335 0.987035 5.40359 0.86201 5.52862C0.736986 5.65364 0.666748 5.82321 0.666748 6.00002C0.666748 6.17683 0.736986 6.3464 0.86201 6.47142C0.987035 6.59645 1.1566 6.66669 1.33341 6.66669H5.33341V10.6667C5.33341 10.8435 5.40365 11.0131 5.52868 11.1381C5.6537 11.2631 5.82327 11.3334 6.00008 11.3334C6.17689 11.3334 6.34646 11.2631 6.47149 11.1381C6.59651 11.0131 6.66675 10.8435 6.66675 10.6667V6.66669H10.6667C10.8436 6.66669 11.0131 6.59645 11.1382 6.47142C11.2632 6.3464 11.3334 6.17683 11.3334 6.00002C11.3334 5.82321 11.2632 5.65364 11.1382 5.52862C11.0131 5.40359 10.8436 5.33335 10.6667 5.33335Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <span>Add New Task</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
