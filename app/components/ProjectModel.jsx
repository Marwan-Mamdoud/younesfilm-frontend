"use client";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteProject } from "@/lib/api";
import Link from "next/link";

const ProjectModel = ({ id, thumbnail, name }) => {
  return (
    <div className="w-[300px] h-[300px] rounded-lg my-16">
      <MdOutlineDelete
        onClick={() => deleteProject(id)}
        className="bg-red-300 text-4xl cursor-pointer w-full py-2"
      />
      <Link className="w-full h-fit bg-blue-300" href={`/edit/${id}`}>
        <FaRegEdit className="bg-blue-300 text-4xl w-full py-2" />
      </Link>
      <Link href={`/${id}`}>
        <img
          alt={name}
          src={thumbnail}
          className="w-[300px] h-[300px] object-contain pt-4 bg-zinc-300"
        />
        <p className="text-black font-bold text-3xl text-center uppercase tracking-wider bg-zinc-300 py-3 z-10">
          {name}
        </p>
      </Link>
    </div>
  );
};

export default ProjectModel;
