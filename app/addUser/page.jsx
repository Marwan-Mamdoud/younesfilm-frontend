"use client";
import { addCategory, addUser, uploadImageToCloudinary } from "@/lib/api";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.5, // Compress to a max of 1MB per image
      maxWidthOrHeight: 1024, // Resize to a max width or height
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };
  const [thumbnail, setThumbnail] = useState();
  const [name, setname] = useState();
  const [loading, setLoading] = useState();
  const router = useRouter();
  const hundleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = await addUser({ name, thumbnail });
    setLoading(false);
    if (user) {
      router.push("/");
    }
  };
  return (
    <div className="mx-auto w-[1250px] pt-36">
      <form onSubmit={hundleSubmit} method="post">
        <div className="flex flex-col gap-3 items-start justify-center">
          <label htmlFor="name" className="">
            Enter User Name<span className="text-red-600 text-2xl"> *</span>
          </label>
          <input
            type="text"
            name="name"
            required
            onChange={(e) => setname(e.target.value)}
            placeholder="Enter User Name"
            className=" outline-none rounded-md px-5 h-12 text-black/60 w-10/12"
          />
        </div>
        <div className="flex items-center mx-auto mt-10  justify-center">
          <label
            htmlFor="thumbnail"
            className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
          >
            {thumbnail ? (
              <img
                loading="lazy"
                src={thumbnail || ""}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>
                Upload thumbnail
                <span className="text-red-600 text-xl"> *</span>
              </span>
            )}
          </label>
          <input
            type="file"
            required
            name="thumbnailImage"
            id="thumbnail"
            onChange={async (e) => {
              if (!e.target.files[0].type.startsWith("image/")) {
                toast.warn("Please upload only image files.");
                e.target.value = null;
                setThumbnail(null);
                return;
                // Clear the input if it's not an image
              }
              const image = await compressImage(e.target.files[0]);
              console.log(image, "compress image");
              const reader = new FileReader();
              reader.readAsDataURL(image);
              reader.onload = async () => {
                const result = await uploadImageToCloudinary(reader.result);
                setThumbnail(result);
                console.log(result, "image after reader");

                // This will be a base64 string
              };
            }}
            className="w-full rounded-md hidden bg-white text-black px-5 h-10 outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-white py-4 px-9 hover:bg-white/80 duration-300 rounded-md text-black block mt-6 items-end font-medium"
        >
          insert
        </button>
      </form>
      <div
        className={`${
          loading ? "" : "hidden"
        }  w-full h-[100dvh] fixed z-50 bottom-0 right-0  backdrop-blur-sm `}
      >
        <div
          className={` bg-white w-[500px]  top-1/2 -translate-x-1/2 z-20 -right-1/2 -translate-y-1/2 text-black h-[300px] relative   flex flex-col items-center justify-center gap-5 shadow-2xl rounded-lg`}
        >
          <img
            src="/laoding.png"
            alt="laoding"
            className="w-20 h-20 animate-spin  rounded-full"
          ></img>
          <p className="font-bold text-4xl tracking-wide">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
