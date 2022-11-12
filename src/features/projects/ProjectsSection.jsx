import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
// import Drawer from "../components/Drawer";
import ProjectCard from "./ProjectCard";
import ProjectsHeader from "./ProjectsHeader";
import { useGetProjectsByUserIdQuery } from "./projectsSlice";
import useDialog from "../../hooks/useDialog";

import AddProjectDialog from "./AddProjectDialog";
import EditProjectDialog from "./EditProjectDialog";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { useGetMeQuery } from "../auth/authApiSlice";
import Loader from "../../components/Loader";

const ProjectsSection = () => {
  const currentUser = useSelector(selectCurrentUser);
  // const { data: me, refetch } = useGetMeQuery("getMe", {
  //   refetchOnFocus: true,
  // }); //testing
  // useEffect(() => {
  //   refetch();
  // }, []);

  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
  } = useGetProjectsByUserIdQuery(currentUser?.id);

  const { handleOpenDialog, handleCloseDialog, isDialogOpen } = useDialog();
  // console.log(projects);

  const handleAddProjectButton = () => {
    handleOpenDialog(setActiveDialog(0));
  };

  const handleEditProjectButton = (id) => {
    setCurrentProjectId(id);
    handleOpenDialog(setActiveDialog(1));
  };

  const handleClose = () => {
    handleCloseDialog();
  };

  //memoise

  const [activeDialog, setActiveDialog] = useState(0);
  const [currentProjectId, setCurrentProjectId] = useState("");

  const clearCurrentProjectId = () => {
    setCurrentProjectId("");
  };

  function getDialog(step) {
    switch (step) {
      case 0:
        return (
          <AddProjectDialog
            isDialogOpen={isDialogOpen}
            handleCloseDialog={handleClose}
          />
        );
      case 1:
        return (
          <EditProjectDialog
            currentProjectId={currentProjectId}
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

  return (
    <div className="min-h-screen">
      <ProjectsHeader handleAddProjectButton={handleAddProjectButton} />
      {isLoading || isError ? (
        <Loader />
      ) : (
        projects?.ids.map((id) => (
          <ProjectCard
            key={id}
            projectId={id}
            handleEditProjectButton={() => handleEditProjectButton(id)}
            clearCurrentProjectId={clearCurrentProjectId}
          />
          // <div>Test</div>
        ))
      )}
      {getDialog(activeDialog)}
    </div>
  );
};

export default ProjectsSection;
