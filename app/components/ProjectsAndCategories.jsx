"use client";
import React from "react";
import Projects from "./Projects";
import Categories from "./Categories";
import { useState } from "react";
import Users from "./Users";

const ProjectsAndCategories = () => {
  const [showProject, setShowProject] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  return (
    <>
      <div className="flex items-center text-lg w-full justify-start gap-6 pt-40">
        <button
          onClick={() => {
            setShowProject(true);
            setShowCategories(false);
            setShowUsers(false);
          }}
          className={`${
            showProject ? "bg-white text-black" : ""
          } flex justify-center items-center gap-2 border-2 border-white  rounded-full px-7 py-[8px] hover:bg-white hover:text-black duration-500 ease-in`}
        >
          {" "}
          Projects
        </button>
        <button
          onClick={() => {
            setShowUsers(true);
            setShowCategories(false);
            setShowProject(false);
          }}
          className={`${
            showUsers ? "bg-white text-black" : ""
          } flex justify-center items-center gap-2 border-2 border-white rounded-full px-7 py-[8px] hover:bg-white hover:text-black duration-500 ease-in`}
        >
          {" "}
          Clients
        </button>
        <button
          onClick={() => {
            setShowCategories(true);
            setShowProject(false);
            setShowUsers(false);
          }}
          className={`flex ${
            showCategories ? "bg-white text-black" : ""
          } justify-center items-center gap-2 border-2 border-white rounded-full px-7 py-[8px]  hover:bg-white hover:text-black duration-500 ease-in`}
        >
          {" "}
          Categories
        </button>
      </div>
      <div className="flex flex-col w-full items-start justify-center gap-5">
        <p className="text-5xl font-semibold">
          {showProject && "Projects"}
          {showCategories && "Categories"}
          {showUsers && "Clients"}
        </p>
        <div className="flex flex-wrap w-full items-start justify-start">
          {showProject && <Projects />}
          {showCategories && <Categories />}
          {showUsers && <Users />}
        </div>
      </div>
    </>
  );
};

export default ProjectsAndCategories;
