"use client";
import React from "react";
import Projects from "./Projects";
import Categories from "./Categories";
import { useState } from "react";
import Users from "./Users";
import Collaborations from "./Collaborations";

const ProjectsAndCategories = () => {
  const [show, setShow] = useState("Projects");

  return (
    <>
      <div className="flex items-center text-lg w-full justify-start gap-6 pt-40">
        <button
          onClick={() => {
            setShow("Projects");
          }}
          className={`${
            show == "Projects" && "bg-white text-black"
          } flex justify-center items-center gap-2 border-2 border-white  rounded-full px-7 py-[8px] hover:bg-white hover:text-black duration-500 ease-in`}
        >
          {" "}
          Projects
        </button>
        <button
          onClick={() => {
            setShow("Clients");
          }}
          className={`${
            show == "Clients" && "bg-white text-black"
          } flex justify-center items-center gap-2 border-2 border-white rounded-full px-7 py-[8px] hover:bg-white hover:text-black duration-500 ease-in`}
        >
          {" "}
          Clients
        </button>
        <button
          onClick={() => {
            setShow("Categories");
          }}
          className={`${
            show == "Categories" && "bg-white text-black"
          } flex justify-center items-center gap-2 border-2 border-white rounded-full px-7 py-[8px]  hover:bg-white hover:text-black duration-500 ease-in`}
        >
          {" "}
          Categories
        </button>
        <button
          onClick={() => {
            setShow("Collaborations");
          }}
          className={`${
            show == "Collaborations" && "bg-white text-black"
          } flex justify-center items-center gap-2 border-2 border-white rounded-full px-7 py-[8px]  hover:bg-white hover:text-black duration-500 ease-in`}
        >
          {" "}
          Collaborations
        </button>
      </div>
      <div className="flex flex-col w-full items-start justify-center gap-5">
        <p className="text-5xl font-semibold">{show}</p>
        <div className="flex flex-wrap w-full items-start justify-start">
          {show == "Projects" && <Projects />}
          {show == "Categories" && <Categories />}
          {show == "Clients" && <Users />}
          {show == "Collaborations" && <Collaborations />}
        </div>
      </div>
    </>
  );
};

export default ProjectsAndCategories;
