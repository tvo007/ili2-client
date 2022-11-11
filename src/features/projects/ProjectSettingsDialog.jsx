import React, { useEffect } from "react";
import {
  useUpdateProjectMutation,
  useGetProjectsByUserIdQuery,
  useGetProjectByIdQuery,
} from "./projectsSlice";
import DialogWrapper from "../../components/DialogWrapper";
import { useForm } from "react-hook-form";
import { UpdateProjectDTO } from "../../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

const ProjectSettingsDialog = ({
  isDialogOpen,
  handleCloseDialog,
  currentProjectId,
}) => {
  const currentUser = useSelector(selectCurrentUser);

  const {
    data: project,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
  } = useGetProjectByIdQuery(currentProjectId);

  const [updateProject, { isLoading: isUpdatingProject }] =
    useUpdateProjectMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateProjectDTO),
    defaultValues: {
      name: project?.name || "",
      desc: project?.desc || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const updatedProject = await updateProject({
        id: project.id,
        name: data.name,
        desc: data.desc,
        userId: currentUser?.id,
      }).unwrap();

      if (updatedProject) handleCloseDialog(reset());

      // console.log(data);
    } catch (error) {
      console.error("Failed to save the post", error);
    }
  };

  // console.log(project);
  // reset();

  useEffect(() => {
    reset({
      name: project?.name,
      desc: project?.desc,
    });
  }, [isDialogOpen]);

  return (
    <DialogWrapper
      title={"Project Settings"}
      isDialogOpen={isDialogOpen}
      handleCloseDialog={handleCloseDialog}
    >
      <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="project-name"
            className="block text-sm text-gray-900 mb-3 font-medium"
          >
            Project Name
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
            Project Description
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
            Update Project
          </button>
        </div>
      </form>
    </DialogWrapper>
  );
};

export default ProjectSettingsDialog;
