"use client";
import {
  EditCollaboration,
  GetCollaboration,
  uploadImageToCloudinary,
} from "@/lib/api.js";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
export default function Page({ params }) {
  const { idColl } = params;
  const [name, setName] = useState({ en: "", ar: "", cz: "" });
  const [text, setText] = useState({ en: "", ar: "", cz: "" });
  const [image, setImage] = useState("");
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.5, // Compress to a max of 1MB per image
      maxWidthOrHeight: 1024, // Resize to a max width or height
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  const GetAndSetColl = async () => {
    try {
      const coll = await GetCollaboration(idColl);
      console.log(coll);

      if (coll) {
        setImage(coll.image);
        setName(coll.name);
        setText(coll.text);
      }
    } catch (error) {
      toast.error(error);
      return;
    }
  };

  const SumbitHundle = async (e) => {
    e.preventDefault();
    await EditCollaboration({ name, text, image, id: idColl });
  };
  useEffect(() => {
    GetAndSetColl();
  }, []);
  return (
    <div className="w-full pt-40">
      <div className="w-full mx-auto">
        <form action="" className="w-8/12 mx-auto" onSubmit={SumbitHundle}>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex items-center mx-auto mt-10  justify-center">
              <label
                htmlFor="thumbnail"
                className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
              >
                {image ? (
                  <img
                    loading="lazy"
                    src={image || ""}
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
                name="image"
                id="thumbnail"
                onChange={async (e) => {
                  if (!e.target.files[0].type.startsWith("image/")) {
                    toast.warn("Please upload only image files.");
                    e.target.value = null;
                    setImage(null);
                    return;
                    // Clear the input if it's not an image
                  }
                  const image = await compressImage(e.target.files[0]);
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = async () => {
                    const result = await uploadImageToCloudinary(reader.result);
                    setImage(result);

                    // This will be a base64 string
                  };
                }}
                className="w-full rounded-md hidden bg-white text-black px-5 h-10 outline-none"
              />
            </div>
            <label htmlFor="nameProject">
              Name of Client in English{" "}
              <span className="text-red-600 text-xl"> *</span>
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={name.en}
              // id="nameProject"
              onChange={(e) =>
                setName((prev) => ({ ...prev, en: e.target.value }))
              }
              placeholder="Enter  Name of Client in English "
              className="w-full name rounded-md bg-white text-black px-5 h-10 outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="nameProject">
              Name of Client in Czech{" "}
              <span className="text-red-600 text-xl"> *</span>
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={name.cz}
              // id="nameProject"
              onChange={(e) =>
                setName((prev) => ({ ...prev, cz: e.target.value }))
              }
              placeholder="Enter Name of Client in czech"
              className="w-full name rounded-md bg-white text-black px-5 h-10 outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="nameProject" className="text-right w-full">
              اسم العميل بالغه العربيه{" "}
              <span className="text-red-600 text-xl"> *</span>
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={name.ar}
              // id="nameProject"
              onChange={(e) =>
                setName((prev) => ({ ...prev, ar: e.target.value }))
              }
              placeholder="اسم العميل"
              className="w-full name rounded-md bg-white text-black px-5 h-10 outline-none text-right"
            />
          </div>
          <div className="pt-20"></div>
          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="nameProject">
              Content in English{" "}
              <span className="text-red-600 text-xl"> *</span>
            </label>
            <input
              type="text"
              required
              defaultValue={text.en}
              // id="nameProject"
              onChange={(e) =>
                setText((prev) => ({ ...prev, en: e.target.value }))
              }
              placeholder="Enter Content in English"
              className="w-full name rounded-md bg-white text-black px-5 h-10 outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="nameProject">
              Content in Czech <span className="text-red-600 text-xl"> *</span>
            </label>
            <input
              type="text"
              required
              defaultValue={text.cz}
              // id="nameProject"
              onChange={(e) =>
                setText((prev) => ({ ...prev, cz: e.target.value }))
              }
              placeholder="Ente Content in Czech"
              className="w-full name rounded-md bg-white text-black px-5 h-10 outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="nameProject" className="text-right w-full">
              المحتوى باللغه العربيه
              <span className="text-red-600 text-xl"> *</span>
            </label>
            <input
              type="text"
              required
              defaultValue={text.ar}
              // id="nameProject"
              onChange={(e) =>
                setText((prev) => ({ ...prev, ar: e.target.value }))
              }
              placeholder="المحتوى"
              className="w-full name rounded-md bg-white text-black px-5 h-10 outline-none text-right"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-black px-10 py-4 my-5 rounded-md hover:bg-white/50 duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
