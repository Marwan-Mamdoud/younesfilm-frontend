"use client";
import { deleteProject } from "@/lib/api";
import Link from "next/link";

const ProjectModel = ({ id, thumbnail, name }) => {
  return (
    <div className="w-[330px] h-[350px] relative rounded-lg my-10">
      <Link href={`/${id}`} className="">
        <img
          alt={name}
          src={thumbnail}
          className="w-full h-full object-cover rounded-xl bg-zinc-300 -z-10 absolute"
        />
        <p className="font-bold text-2xl absolute bottom-0 py-5 px-4">{name}</p>
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
          onClick={() => deleteProject(id)}
          className="w-6 h-6 z-50"
        />
      </div>
    </div>
  );
};

export default ProjectModel;
