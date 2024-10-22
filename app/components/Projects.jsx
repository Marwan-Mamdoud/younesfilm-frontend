"use client";
import { getProjects } from "@/lib/api";
import ProjectModel from "./ProjectModel";
import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState();
  useEffect(async () => {
    const data = await getProjects();
    setProjects(data);
  }, []);

  return (
    <div className="flex flex-wrap gap-10 mt-36 items-center justify-center p-5">
      {projects.map((project) => {
        return (
          <ProjectModel
            key={project.name}
            name={project.name}
            id={project._id}
            thumbnail={`${project.thumbnail}`}
          />
        );
      })}
    </div>
  );
};

export default Projects;
