"use client";
import Projects from "./components/Projects";
import { useState } from "react";
import Categories from "./components/Categories";

export default function Home() {
  const [hideProject, setHideProject] = useState(true);
  return (
    <div className="w-full py-6 h-full font-sans">
      <div className="flex justify-between max-w-[1100px] mx-auto  items-center"></div>
      <div className="max-w-[1200px] mx-auto flex flex-col items-start justify-center gap-14">
        <div className="flex items-center text-lg justify-center gap-6 pt-40">
          <button
            onClick={() => {
              setHideProject(true);
            }}
            className={`${
              hideProject ? "bg-white text-black" : ""
            } flex justify-center items-center gap-2 border-2 border-white rounded-full px-7 py-[8px] hover:bg-white hover:text-black duration-500 ease-in`}
          >
            {" "}
            Projects
          </button>
          <button
            onClick={() => {
              setHideProject(false);
            }}
            className={`flex ${
              !hideProject ? "bg-white text-black" : ""
            } justify-center items-center gap-2 border-2 border-white rounded-full px-7 py-[8px]  hover:bg-white hover:text-black duration-500 ease-in`}
          >
            {" "}
            Categories
          </button>
        </div>
        <div className="flex flex-col items-start justify-center gap-5">
          <p className="text-5xl font-semibold">
            {hideProject ? "Projects" : "Categories"}
          </p>
          <div className="flex flex-wrap items-start justify-start">
            {hideProject ? <Projects /> : <Categories />}
          </div>
        </div>
      </div>
    </div>
  );
}
