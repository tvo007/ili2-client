import { useForm } from "react-hook-form";
import { AddProjectDTO } from "../../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddNewProjectMutation } from "./projectsSlice";
import DialogWrapper from "../../components/DialogWrapper";
import { useEffect, useState } from "react";
import PriorityList from "../../components/PriorityList";

import { useGetMeQuery } from "../../features/auth/authApiSlice";
import { selectCurrentUser } from "../auth/authSlice";
import { useSelector } from "react-redux";

const AddProjectDialog = ({ isDialogOpen, handleCloseDialog }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [addNewProject, { isLoading }] = useAddNewProjectMutation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(AddProjectDTO) });

  const [currentPriority, setCurrentPriority] = useState("low");

  const onSubmit = async (data) => {
    try {
      const newProject = await addNewProject({
        name: data.name,
        desc: data.desc,
        userId: currentUser?.id,
        priority: currentPriority,
      }).unwrap();
      if (newProject) handleCloseDialog(reset());
    } catch (error) {
      console.error("Failed to save the post", error);
      handleCloseDialog(reset());
    }
  };

  useEffect(() => {
    setCurrentPriority("low");
  }, [isDialogOpen]);

  return (
    <DialogWrapper
      title={"Add Project"}
      isDialogOpen={isDialogOpen}
      handleCloseDialog={handleCloseDialog}
    >
      <form className="p-6 h-[75vh]" onSubmit={handleSubmit(onSubmit)}>
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
              name="field-name"
              rows="4"
              placeholder="Write something..."
              {...register("desc")}
            ></textarea>
          </div>
          {errors.desc?.message && <p>{errors.desc?.message}</p>}
        </div>
        <div className="mb-6 flex flex-row space-x-4">
          <label
            htmlFor="project-desc"
            className="block text-sm text-gray-900 mb-3 font-medium pt-3"
          >
            Project Priority
          </label>
          <PriorityList
            currentItem={currentPriority}
            setCurrentItem={setCurrentPriority}
          />
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
            Create Project
          </button>
        </div>
      </form>
    </DialogWrapper>
  );
};

export default AddProjectDialog;

//https://www.austinshelby.com/blog/build-a-react-form-with-react-hook-form-and-zod
