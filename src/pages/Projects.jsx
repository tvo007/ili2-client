import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Private from "../components/Private";
import { selectCurrentUser } from "../features/auth/authSlice";
import ProjectsSection from "../features/projects/ProjectsSection";

const Projects = () => {
  // console.log(`Is it fetching?' ${isFetching ? "Yes" : "No"}`);
  // console.log(me);

  return (
    <Private>
      <Layout>
        <ProjectsSection />
      </Layout>
    </Private>
  );
};

export default Projects;
