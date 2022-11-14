import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDialog from "../../hooks/useDialog";
import AddTaskDialog from "./AddTaskDialog";
import EditTaskDialog from "./EditTaskDialog";
import TaskColumn from "./TaskColumn";
import {
  useGetBoardByProjectIdQuery,
  useGetTasksByProjectIdQuery,
  useMoveTaskMutation,
} from "./tasksSlice";
import { useGetColumnsByProjectIdQuery } from "./columnsSlice";
import { DragDropContext } from "@hello-pangea/dnd";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { moveSyncTask, selectCurrentBoard, setBoard } from "./boardSlice";

const TasksSection = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const {
    data: board,
    refetch: refetchBoard,
    isLoading: isBoardLoading,
    isSuccess: isBoardLoaded,
  } = useGetBoardByProjectIdQuery(projectId);

  //sync version of board
  const currentBoard = useSelector(selectCurrentBoard);

  useEffect(() => {
    if (
      !currentBoard.id !== board?.id ||
      JSON.stringify(currentBoard.order) !== JSON.stringify(board?.order)
    ) {
      dispatch(setBoard({ order: board?.order, id: board?.id }));
    }
  }, [board]);
  //set board state only on initial load
  //should be out of sync with async board

  // console.log(boardState);

  const {
    data: tasks,
    isLoading,
    isSuccess: isTasksLoaded,
    isError,
    error,
    isFetching,
  } = useGetTasksByProjectIdQuery(projectId);

  const {
    data: columns,
    isLoading: isColLoading,
    isSuccess: isColLoaded,
  } = useGetColumnsByProjectIdQuery(projectId, {});

  const [moveTask, { isLoading: isUpdatingBoard }] = useMoveTaskMutation();
  const [currentTaskId, setCurrentTaskId] = useState("");
  const { handleOpenDialog, handleCloseDialog, isDialogOpen } = useDialog();

  const handleAddTaskButton = () => {
    handleOpenDialog(setActiveDialog(0));
  };

  const handleEditTaskButton = (id) => {
    setCurrentTaskId(id);
    handleOpenDialog(setActiveDialog(1));
  };

  const handleClose = () => {
    handleCloseDialog();
  };

  const [activeDialog, setActiveDialog] = useState(0);

  function getDialog(step) {
    switch (step) {
      case 0:
        return (
          <AddTaskDialog
            isDialogOpen={isDialogOpen}
            handleCloseDialog={handleClose}
          />
        );
      case 1:
        return (
          <EditTaskDialog
            currentTaskId={currentTaskId}
            isDialogOpen={isDialogOpen}
            handleCloseDialog={handleClose}
          />
        );
      default:
        return (
          <AddProjectDialog
            isDialogOpen={isDialogOpen}
            handleCloseDialog={handleClose}
          />
        );
    }
  }

  // console.log(Object.values(columns.entities));
  //drag and drop handler
  const handleDragEnd = async ({ source, destination, draggableId }) => {
    try {
      // Dropped outside the column
      if (!destination) {
        return;
      }

      // Card has not been moved
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      /**sync move tasks here*/
      //Moved to the same column on different position
      //make copy
      //remove task from column
      //change task position
      await dispatch(
        moveSyncTask({
          taskId: draggableId,
          targetColId: destination.droppableId,
          sourceColId: source.droppableId,
          targetPosition: destination.index,
        })
      );

      /**sync move tasks here  */

      const triggerMoveTask = await moveTask({
        taskId: draggableId,
        targetColId: destination.droppableId,
        sourceColId: source.droppableId,
        targetPosition: destination.index,
      }).unwrap();

      if (triggerMoveTask) {
        await refetchBoard();
      }

      // console.log({
      //   taskId: draggableId,
      //   targetColumnId: destination.droppableId,
      //   targetIndex: destination.index,
      //   sourceColumnId: source.droppableId,
      //   projectId: projectId,
      // });

      // toast.success("Card moved!");
    } catch (err) {
      console.error(err);
      // toast.error("Something went wrong!");
    }
  };

  // function order(a, b) {
  //   return a.position < b.position ? -1 : a.position > b.position ? 1 : 0;
  // }

  // console.log(board);
  return (
    <section>
      <div>{isLoading && !isTasksLoaded && !isColLoaded && <Loader />}</div>

      {isBoardLoaded && isTasksLoaded && isColLoaded && (
        <div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="container px-4 mx-auto">
              <div className="flex flex-wrap -m-4">
                {board?.order.columns.map((col) => (
                  <TaskColumn
                    colId={col.id}
                    key={col.id}
                    handleAddTaskButton={handleAddTaskButton}
                    handleEditTaskButton={handleEditTaskButton}
                  />
                ))}
              </div>
            </div>
          </DragDropContext>
          {/* <AddTaskForm /> */}
          {/* <EditTaskDialog
        isDialogOpen={isDialogOpen}
        handleCloseDialog={handleCloseDialog}
        currentTaskId={currentTaskId}
      /> */}
          {getDialog(activeDialog)}
        </div>
      )}
    </section>
  );
};

export default TasksSection;

/**
 * updating col positions within same col
 * opt 1: send back array of objects containing updated {position, taskId}
 * have backend edit multiple tasks within column with new positions
 *
 * opt 2:
 * set task.position to column.length + 1 * 1000 on initial create
 * [1000, 2000, 3000, ...]
 * how to calc in between???
 */

//  28cc93df-4722-4c37-8757-adcc737ca03d : 2

//  048ffa6b-c0f2-4a75-a211-e5ddaefa542f : 1

//  510e0472-b83b-427e-b82e-a9a15e793868 : 0
