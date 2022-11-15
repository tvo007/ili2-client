import { zodResolver } from "@hookform/resolvers/zod";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import DialogWrapper from "../../components/DialogWrapper";
import { UpdateTaskDTO } from "../../utils/schema";
import {
  useDeleteTaskMutation,
  useGetBoardByProjectIdQuery,
  useGetTasksByProjectIdQuery,
  useUpdateTaskMutation,
} from "./tasksSlice";
import { useGetColumnsByProjectIdQuery } from "./columnsSlice";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import MiniLoader from "../../components/MiniLoader";

const EditTaskDialog = ({ isDialogOpen, handleCloseDialog, currentTaskId }) => {
  const { projectId } = useParams();
  const {
    data: board,
    refetch: refetchBoard,
    isLoading: isBoardLoading,
    isSuccess: isBoardLoaded,
  } = useGetBoardByProjectIdQuery(projectId);
  const { task, isLoading: isTaskLoading } = useGetTasksByProjectIdQuery(
    projectId,
    {
      selectFromResult: ({ data, isLoading }) => ({
        task: data?.entities[currentTaskId],
        isLoading,
      }),
    }
  );

  const { data: columns, isSuccess: isColumnsLoaded } =
    useGetColumnsByProjectIdQuery(projectId);

  const [updateTask, { isLoading: isUpdatingTask }] = useUpdateTaskMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateTaskDTO),
    defaultValues: {
      name: task?.name,
      desc: task?.desc,
    },
  });

  const [currentColumnId, setCurrentColumnId] = useState(task?.column || "");

  const onSubmit = async (data) => {
    try {
      const updatedTask = await updateTask({
        name: data.name,
        desc: data.desc,
        taskId: task?.id,
        projectId: projectId,
        targetColId: currentColumnId,
        sourceColId: task.column,
      }).unwrap();
      if (updatedTask) {
        await refetchBoard();
        handleCloseDialog(reset());
      }
      // const test = {
      //   name: data.name,
      //   desc: data.desc,
      //   taskId: task?.id,
      //   projectId: projectId,
      //   targetColId: currentColumnId,
      //   sourceColId: task.column,
      // };
      // console.log(test);
    } catch (error) {
      console.error("Failed to save the post", error);
    }
  };

  useEffect(() => {
    setCurrentColumnId(task?.column || "");
    reset({
      name: task?.name || "",
      desc: task?.desc || "",
    });
  }, [isDialogOpen]);

  return (
    <DialogWrapper
      title={"Edit Task"}
      isDialogOpen={isDialogOpen}
      handleCloseDialog={handleCloseDialog}
    >
      <form
        className="p-6 h-[75vh] flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6">
          <label
            htmlFor="project-name"
            className="block text-sm text-gray-900 mb-3 font-medium"
          >
            Task Name
          </label>
          <div className="p-px bg-gradient-cyan rounded-lg">
            <input
              className="w-full px-6 py-4 placeholder-gray-500 text-base text-gray-500 bg-white outline-none rounded-lg"
              type="text"
              placeholder="Write a text"
              {...register("name")}
            />
          </div>
          {errors.name?.message && <p>{errors.name?.message}</p>}
        </div>
        <div className="mb-6">
          <label
            htmlFor="project-desc"
            className="block text-sm text-gray-900 mb-3 font-medium"
          >
            Task Description
          </label>
          <div className="p-px bg-gradient-cyan  rounded-lg">
            <textarea
              className="w-full px-6 py-4 placeholder-gray-500 text-base text-gray-500 bg-white outline-none rounded-lg"
              rows="4"
              placeholder="Write something..."
              {...register("desc")}
            ></textarea>
          </div>
          {errors.desc?.message && <p>{errors.desc?.message}</p>}
        </div>
        <div>
          {/**list box here */}
          <div className="w-[10rem]">
            <Listbox value={currentColumnId} onChange={setCurrentColumnId}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">
                    {columns?.entities[currentColumnId].name}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {columns?.ids.map((colId) => (
                      <Listbox.Option
                        key={colId}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-blue-100 text-blue-900"
                              : "text-gray-900"
                          }`
                        }
                        value={colId}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {columns.entities[colId]}
                            </span>
                            {task.column === colId ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        <div className="mt-auto flex flex-row space-x-4 pb-4 justify-end">
          <div className="space-x-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-blue-100  px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => handleCloseDialog(reset())}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[7rem] inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              {isUpdatingTask ? <MiniLoader /> : "Update Task"}
            </button>
          </div>
        </div>
      </form>
      )
    </DialogWrapper>
  );
};

export default EditTaskDialog;
