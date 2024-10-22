import { getProjects } from "@/lib/api";
import ProjectModel from "./ProjectModel";

const Projects = async () => {
  const projects = await getProjects();

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
