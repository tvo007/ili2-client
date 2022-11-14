import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { AddTaskDTO } from "../../utils/schema";
import {
  useAddNewTaskMutation,
  useGetBoardByProjectIdQuery,
} from "./tasksSlice";
import { useGetColumnsByProjectIdQuery } from "./columnsSlice";
import DialogWrapper from "../../components/DialogWrapper";
import { addSyncTask, setBoard } from "./boardSlice";
import { useDispatch } from "react-redux";

const AddTaskDialog = ({ isDialogOpen, handleCloseDialog }) => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  // const {
  //   data: board,
  //   refetch: refetchBoard,
  //   isLoading: isBoardLoading,
  //   isSuccess: isBoardLoaded,
  // } = useGetBoardByProjectIdQuery(projectId);

  const { column } = useGetColumnsByProjectIdQuery(projectId, {
    selectFromResult: ({ data }) => ({
      column: Object.values(data.entities).find((col) => col.name === "Todo"),
    }),
  });

  //data?.find((col) => col.name === "Todo")

  const [addNewTask, { isSuccess, isError, error }] = useAddNewTaskMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(AddTaskDTO) });

  const onSubmit = async (data) => {
    try {
      const newTask = await addNewTask({
        name: data.name,
        desc: data.desc,
        projectId: projectId,
        columnId: column.id,
      }).unwrap();

      if (isError) throw new Error(error);

      if (newTask) {
        // console.log(newTask);
        // await refetchBoard().then((res) => console.log(res));
        await refetchBoard();
        await dispatch(
          addSyncTask({
            targetColId: column.id,
            taskId: newTask.id,
          })
        );
        handleCloseDialog(reset());
      }

      // const test = {
      //   name: data.name,
      //   desc: data.desc,
      //   projectId: projectId,
      //   columnId: column.id,
      //   order: JSON.stringify(column?.order),
      // };
      // console.log(test.order);
    } catch (error) {
      console.error("Failed to create new task.", error);
    } finally {
      reset();
    }
  };
  return (
    <DialogWrapper
      title={"Add Task"}
      isDialogOpen={isDialogOpen}
      handleCloseDialog={handleCloseDialog}
    >
      <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="task-name"
            className="block text-sm text-gray-900 mb-3 font-medium"
          >
            Task Name
          </label>
          <div className="p-px bg-gradient-cyan rounded-lg">
            <input
              className="w-full px-6 py-4 placeholder-gray-500 text-base text-gray-500 bg-white outline-none rounded-lg"
              type="text"
              placeholder="Write a text"
              name="name"
              {...register("name")}
            />
          </div>
          {errors.name?.message && <p>{errors.name?.message}</p>}
        </div>
        <div className="mb-6">
          <label
            htmlFor="task-desc"
            className="block text-sm text-gray-900 mb-3 font-medium"
          >
            Task Description
          </label>
          <div className="p-px bg-gradient-cyan  rounded-lg">
            <textarea
              className="w-full px-6 py-4 placeholder-gray-500 text-base text-gray-500 bg-white outline-none rounded-lg"
              name="desc"
              rows="4"
              placeholder="Write something..."
              {...register("desc")}
            ></textarea>
          </div>
          {errors.desc?.message && <p>{errors.desc?.message}</p>}
        </div>
        <div className="mt-4 flex flex-row space-x-4 justify-end">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-blue-100  px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => handleCloseDialog(reset())}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Add Task
          </button>
        </div>
      </form>
    </DialogWrapper>
  );
};

export default AddTaskDialog;
/**
 * 
 * 
 * "{\"21c3a563-01b2-4c37-8dad-9fbaf389613d\":1,\"693ae3b3-cd31-4718-b150-ae5768b411b2\":3,\"db1233a1-b735-4c18-823b-ff4dd59cb121\":2}"
 *
 *{"db1233a1-b735-4c18-823b-ff4dd59cb121":0,"21c3a563-01b2-4c37-8dad-9fbaf389613d":1,"693ae3b3-cd31-4718-b150-ae5768b411b2":2}

 */

/**
  * {
    "8ef166e4-6716-49a6-986b-152499082f83": 1,
    "c1cdb774-29af-4cc1-b2a8-6e1d0a50097e": 2,
    "dbb79bed-8404-46ca-9bea-83da73a33f53": 3
}
  */
