import { getProjects, sortedProjects } from "@/lib/api";
import React from "react";
import { useEffect, useState } from "react";
import ProjectModel from "./ProjectModel";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
const Projects = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setpages] = useState();

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((item) => item.id === active.id);
      const newIndex = projects.findIndex((item) => item.id === over.id);
      setProjects((items) => arrayMove(items, oldIndex, newIndex));
    }
  };
  useEffect(() => {
    sortedProjects(projects);
  }, [projects]);

  useEffect(() => {
    setLoading(true);
    getProjects(currentPage).then((res) => {
      setProjects(res.projects);
      setpages(res.pages);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    getProjects(currentPage).then((res) => {
      setProjects(res.projects);
      setpages(res.pages);
    });
  }, [currentPage]);

  return loading ? (
    <div
      className={`${
        loading ? "" : "hidden"
      }  w-full h-[100dvh] fixed z-50 bottom-0 right-0 backdrop-blur-sm `}
    >
      <div
        className={` bg-white w-[500px] shadow-lg  top-1/2 -translate-x-1/2 z-20 -right-1/2 -translate-y-1/2 text-black h-[300px] relative   flex flex-col items-center justify-center gap-5  rounded-lg`}
      >
        <img
          loading="lazy"
          src="/laoding.png"
          alt="laoding"
          className="w-20 h-20 animate-spin  rounded-full"
        />
        <p className="font-bold text-4xl tracking-wide">Loading...</p>
      </div>
    </div>
  ) : (
    <div className="w-full">
      <DndContext onDragEnd={handleDragEnd} className="w-full h-full">
        <SortableContext items={projects.map((item) => (item.id = item._id))}>
          <div className="flex flex-wrap items-center text-black justify-start gap-10">
            {projects.map((item) => (
              <ProjectModel
                key={item._id}
                id={item._id}
                name={item.name}
                thumbnail={item.thumbnail}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Projects;
