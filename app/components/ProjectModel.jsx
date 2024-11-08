"use client";
import { deleteProject } from "@/lib/api";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { useState } from "react";

const ProjectModel = ({ id, thumbnail, name }) => {
  const [openDialop, setOpenDialog] = useState(true);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <>
      <div
        onClick={(() => setOpenDialog(true), console.log("done"))}
        className={`${
          openDialop ? "" : "hidden"
        } top-0 right-0 w-[100dvw] z-30 fixed flex items-center justify-center h-[100dvh] mx-10 backdrop-blur-md  text-black`}
      >
        <div className="w-[600px] z-50 h-fit flex items-center justify-center flex-col rounded-2xl p-5 py-20 bg-white">
          <p className="text-3xl cursor-default font-bold  text-center tracking-wide">
            -Are you sure you want to delete <br></br>
            <span className="mt-2 text-stone-600">-- {name} --</span> project?!
          </p>
          <div className="flex items-center text-white font-bold text-2xl tracking-wide mt-12 justify-center gap-20">
            <button className="px-10 py-4 bg-green-400 rounded-2xl">
              No, Close
            </button>
            <button
              onClick={() => deleteProject(id)}
              className="px-10 py-4 bg-red-400 rounded-2xl"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${
          openDialop ? "-z-10" : ""
        }w-[330px] h-[350px] relative cursor-move rounded-lg my-10 `}
      >
        <Link href={`/${id}`} className="">
          <img
            alt={name}
            src={thumbnail}
            className="w-full h-full object-cover rounded-xl bg-zinc-300 -z-10 absolute"
          />
          <p className="font-bold text-2xl text-white absolute bottom-0 py-5 px-4">
            {name}
          </p>
          <div className="overlay"></div>
        </Link>
        <div className="absolute right-5 top-3 flex items-center cursor-pointer justify-center gap-5">
          <Link href={`/edit/${id}`} className="w-full h-full ">
            <img
              src="https://cdn.prod.website-files.com/66eaae371a3339a1873d1c70/66f2caebf0f6165c1abbe4b2_pencil-white.png"
              alt="Edit"
              className="w-6 h-6"
            />
          </Link>
          <img
            src="https://cdn.prod.website-files.com/66eaae371a3339a1873d1c70/66f2cae281b321c33c489471_bin-white.png"
            alt="delete"
            onClick={() => setOpenDialog(true)}
            className="w-6  h-6 z-10"
          />
        </div>
      </div>
    </>
  );
};

export default ProjectModel;
