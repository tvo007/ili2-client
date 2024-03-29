import React from "react";
import Layout from "../components/Layout";
import TasksSection from "../features/tasks/TasksSection";
import ProjectHeader from "../features/projects/ProjectHeader";
import Private from "../components/Private";

const Project = () => {
  return (
    <Layout>
      <Private>
        <ProjectHeader />
        <TasksSection />
      </Private>
    </Layout>
  );
};

export default Project;
