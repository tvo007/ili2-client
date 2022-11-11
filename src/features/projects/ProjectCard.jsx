import React from "react";
import {
  useDeleteProjectMutation,
  useGetProjectsByUserIdQuery,
} from "./projectsSlice";
import DropDownMenu from "../../components/DropdownMenu";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import ProjectPriority from "./ProjectPriority";
import { useGetMeQuery } from "../auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

const ProjectCard = ({
  projectId,
  handleEditProjectButton,
  clearCurrentProjectId,
}) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const { project, isLoading, isSuccess, isError, error, isFetching } =
    useGetProjectsByUserIdQuery(currentUser?.id, {
      selectFromResult: ({ data }) => ({
        project: data?.entities[projectId],
      }),
    });

  // const { project } = useGetProjectsQuery("getProjects", {
  //   selectFromResult: ({ data }) => ({
  //     project: data?.entities[projectId],
  //   }),
  // });

  const [deleteProject] = useDeleteProjectMutation();

  const handleDeleteProjectButton = async () => {
    try {
      await deleteProject({ id: project?.id }).unwrap();
      clearCurrentProjectId();
      //set modal state to null
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  // console.log(project);

  return (
    <div className="py-8">
      <div className="container px-4 mx-auto ">
        <div className="p-6 bg-white rounded shadow">
          <div className="flex justify-between items-center mb-6">
            <ProjectPriority priority={project?.priority} />
            {/**drop down menu */}
            <DropDownMenu
              handleEditButton={handleEditProjectButton}
              handleDeleteButton={handleDeleteProjectButton}
            />
          </div>
          <div className="mb-4">
            <Link to={`/projects/${project?.id}`} className="hover:underline">
              <h3 className="mb-2 font-medium">{project?.name}</h3>
            </Link>
            <p className="text-sm text-gray-500">{project?.desc}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-500 font-bold">
                {project?.createdBy.fullName}
              </p>
              {/* <img
                className="w-8 h-8 rounded-full object-cover object-right"
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80"
                alt=""
              />
              <img
                className="w-8 h-8 -ml-2 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80"
                alt=""
              />
              <img
                className="w-8 h-8 -ml-2 rounded-full object-cover object-top"
                src="https://images.unsplash.com/photo-1528936466093-76ffdfcf7a40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
                alt=""
              />
              <div className="inline-flex -ml-2 items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-xs font-medium text-indigo-500">
                +3
              </div> */}
            </div>
            <div className="flex">
              <a
                className="flex mr-4 items-center text-xs text-gray-500"
                href="#"
              >
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
                <span>Last updated {moment(project?.updatedAt).fromNow()}</span>
              </a>
              {/* <a className="flex items-center text-xs text-gray-500" href="#">
                <span className="mr-2">
                  <svg
                    className="h-4 w-4 text-gray-200"
                    viewBox="0 0 15 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0837 9.33334L7.91699 14.5C6.50032 15.9167 4.25033 15.9167 2.91699 14.5C1.50033 13.0833 1.50033 10.8333 2.91699 9.50001L9.58366 2.83334C10.417 2.08334 11.667 2.08334 12.5003 2.83334C13.3337 3.66668 13.3337 5.00001 12.5003 5.75001L6.75033 11.5C6.50033 11.75 6.08366 11.75 5.83366 11.5C5.58366 11.25 5.58366 10.8333 5.83366 10.5833L10.0837 6.33334C10.417 6.00001 10.417 5.50001 10.0837 5.16668C9.75032 4.83334 9.25032 4.83334 8.91699 5.16668L4.66699 9.50001C3.75033 10.4167 3.75033 11.8333 4.66699 12.75C5.58366 13.5833 7.00032 13.5833 7.91699 12.75L13.667 7.00001C15.167 5.50001 15.167 3.16668 13.667 1.66668C12.167 0.166676 9.83366 0.166676 8.33366 1.66668L1.66699 8.33334C0.666992 9.33334 0.166992 10.6667 0.166992 12C0.166992 14.9167 2.50032 17.1667 5.41699 17.1667C6.83366 17.1667 8.08366 16.5833 9.08366 15.6667L14.2503 10.5C14.5837 10.1667 14.5837 9.66668 14.2503 9.33334C13.917 9.00001 13.417 9.00001 13.0837 9.33334Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <span>2</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
