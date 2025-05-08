"use client";
import { DeleteBlog } from "@/lib/api.js";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { useState } from "react";
import { useRef, useEffect } from "react";

const BlogModel = ({ id, thumbnail, name }) => {
  const imgRef = useRef();
  const [openDialop, setOpenDialog] = useState(false);
  const [hide, setHide] = useState(true);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  // useEffect(() => {
  //   imgRef.current.addEventListener(
  //     "click",
  //     () => setOpenDialog(true),
  //     alert("done image")
  //   );
  // }, []);

  return (
    <>
      <div
        onClick={() => {
          setOpenDialog(false);
          console.log("done close dailog");
        }}
        className={`${
          openDialop ? "" : "hidden"
        } top-0 right-0 w-[100dvw] z-50  fixed flex items-center justify-center h-[100dvh] mx-10 backdrop-blur-md  text-black`}
      >
        <div className="w-[600px]  h-fit flex items-center justify-center flex-col rounded-2xl p-5 py-20 bg-white">
          <p className="text-3xl cursor-default font-bold  text-center tracking-wide">
            -Are you sure you want to delete <br></br>
            <span className="mt-2 text-stone-600">-- {name} --</span> project?!
          </p>
          <div className="flex items-center text-white font-bold text-2xl tracking-wide mt-12 justify-center gap-20">
            <button className="px-10 py-4 bg-green-400 rounded-2xl">
              No, Close
            </button>
            <button
              onClick={(e) => (e.preventDefault(), DeleteBlog(id))}
              className="px-10 py-4 bg-red-400 rounded-2xl"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
      <div
        style={style}
        onMouseEnter={() => setHide(false)}
        onMouseLeave={() => setHide(true)}
        className={`${
          openDialop ? "-z-10" : ""
        }w-[330px] h-[350px] relative rounded-lg my-10 `}
      >
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className={`overlayDrag  text-white justify-center ${
            hide ? "opacity-0" : ""
          } font-semibold cursor-grab duration-500 transition-all  text-center  flex items-center`}
        >
          Drag and Drop
        </div>
        <Link href={`/${id}`} className="">
          <img
            alt={name}
            src={thumbnail}
            className="w-full h-full object-cover -z-10 rounded-xl bg-zinc-300  absolute"
          />
          <p className="font-bold text-2xl z-10 text-white absolute bottom-0 py-5 px-4">
            {name}
          </p>
          <div className="overlay"></div>
        </Link>
        <div className="absolute right-5 z-40 top-3 flex items-center cursor-pointer justify-center gap-5">
          <Link href={`/editBlog/${id}`} className="w-full h-full ">
            <img
              src="https://cdn.prod.website-files.com/66eaae371a3339a1873d1c70/66f2caebf0f6165c1abbe4b2_pencil-white.png"
              alt="Edit"
              className="w-6 h-6"
            />
          </Link>
          <img
            ref={imgRef}
            onClick={() => setOpenDialog(true)}
            src="https://cdn.prod.website-files.com/66eaae371a3339a1873d1c70/66f2cae281b321c33c489471_bin-white.png"
            alt="delete"
            className="w-6   h-6 "
          />
        </div>
      </div>
    </>
  );
};

export default BlogModel;
