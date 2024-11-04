import { getProjects, sortedProjects } from "@/lib/api";
import ProjectModel from "./ProjectModel";
import dynamic from "next/dynamic";
const Sortable = dynamic(() => import("react-sortablejs"), { ssr: false });

import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
// import Sortable from "sortablejs";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((data) => setProjects(data));
  }, []);

  useEffect(() => {
    sortedProjects(projects);
  }, [projects]);

  return (
    <div className="flex flex-wrap gap-10 items-start justify-start">
      <ReactSortable
        className="flex flex-wrap  gap-10 items-start justify-start"
        list={projects}
        setList={setProjects}
      >
        {projects?.map((project) => (
          <ProjectModel
            key={project._id}
            name={project.name}
            id={project._id}
            thumbnail={`${project.thumbnail}`}
          />
        ))}
      </ReactSortable>
    </div>
  );
};

export default Projects;
