"use client";
import {
  CreateBlog,
  getCategoriesBlog,
  uploadImageToCloudinary,
} from "@/lib/api.js";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import QuillEditor from "../add/quill";

export default function Page() {
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.5, // Compress to a max of 1MB per image
      maxWidthOrHeight: 1024, // Resize to a max width or height
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };
  const [name, setName] = useState({ en: "", cz: "", ar: "" });
  const [description, setDescription] = useState({ en: "", cz: "", ar: "" });
  const [image, setImage] = useState();
  const [texten, setTextEn] = useState();
  const [textcz, setTextCz] = useState();
  const [textar, setTextAr] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [style, setStyle] = useState();
  const [loading, setLoading] = useState(false);
  const hundleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await CreateBlog({
        name,
        description,
        // category,
        style,
        text: { en: texten, cz: textcz, ar: textar },
        image,
      });
      if (result) {
        toast.success(result);
        return setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return toast.error(error);
    }
  };
  const GetAllCat = async () => {
    try {
      const result = await getCategoriesBlog();
      setCategories(result);
    } catch (error) {
      toast.error(error);
    }
  };
  // useEffect(() => {
  //   GetAllCat();
  // }, []);
  return (
    <div className="w-full ">
      <div className="w-full pt-40 mx-auto">
        <form
          onSubmit={hundleSubmit}
          id="form"
          className="w-7/12 mx-auto relative"
          method="post"
        >
          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="nameProject">
              Name of Blog in English{" "}
              <span className="text-red-600 text-xl"> *</span>
            </label>
            <input
              type="text"
              onChange={(e) =>
                setName((prev) => ({ ...prev, en: e.target.value }))
              }
              name="name"
              placeholder="Enter name of Blog in English"
              className="w-full name rounded-md bg-white text-black px-5 h-10 outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="nameProject">
              Name of Blog in Czech{" "}
              <span className="text-red-600 text-xl"> *</span>
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) =>
                setName((prev) => ({ ...prev, cz: e.target.value }))
              }
              placeholder="Enter name of Blog in Czech"
              className="w-full name rounded-md bg-white text-black px-5 h-10 outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="nameProject" className="text-right w-full">
              أسم المدونه <span className="text-red-600 text-xl"> *</span>
            </label>
            <input
              type="text"
              onChange={(e) =>
                setName((prev) => ({ ...prev, ar: e.target.value }))
              }
              name="name"
              placeholder="أسم المدونه"
              className="w-full name rounded-md text-right bg-white text-black px-5 h-10 outline-none"
            />
          </div>
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
              required
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
          {/* <div className="flex flex-col mt-5 items-start justify-start gap-2">
            <label htmlFor="categoryProject">
              Category of Blog <span className="text-red-600 text-xl"> *</span>
            </label>
            <select
              name="category"
              id="categoryProject"
              required
              defaultValue="Select category"
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category of project"
              className="w-full rounded-md bg-white text-black px-5 h-10 outline-none"
            >
              <option disabled value="">
                Select category
              </option>
              {categories?.map((item, index) => (
                <option key={index} value={item.name[0]}>
                  {item.name[0]}
                </option>
              ))}
            </select>
          </div> */}
          <div className="flex flex-col mt-5 items-start justify-start gap-2">
            <label htmlFor="">
              Style of Blog <span className="text-red-600 text-xl"> *</span>
            </label>
            <select
              name="style"
              defaultValue="none"
              onChange={(e) => setStyle(e.target.value)}
              className="w-full rounded-md bg-white text-black px-5 h-10 outline-none"
            >
              <option selected value="none">
                none
              </option>
              <option value="tall">Tall</option>
              <option value="wide">Wide</option>
            </select>
          </div>
          <div className="flex flex-col mt-5 items-start justify-start gap-2">
            <label htmlFor="">Description of Blog In English</label>
            <textarea
              onChange={(e) =>
                setDescription((prev) => ({ ...prev, en: e.target.value }))
              }
              placeholder="Enter Description Blog in English"
              className="w-full review rounded-md bg-white h-28 text-black px-5 py-3 outline-none"
            />
          </div>
          <div className="flex flex-col mt-5 items-start justify-start gap-2">
            <label htmlFor="">Description of Blog In Czech</label>
            <textarea
              onChange={(e) =>
                setDescription((prev) => ({ ...prev, cz: e.target.value }))
              }
              placeholder="Enter Description Blog in Czech"
              className="w-full review rounded-md bg-white h-28 text-black px-5 py-3 outline-none"
            />
          </div>
          <div className="flex flex-col mt-5 items-start justify-start gap-2">
            <label htmlFor="" className="w-full text-right">
              وصف المدونه
            </label>
            <textarea
              onChange={(e) =>
                setDescription((prev) => ({ ...prev, ar: e.target.value }))
              }
              placeholder="أدخل وصف المدونه"
              className="w-full text-right review rounded-md bg-white h-28 text-black px-5 py-3 outline-none"
            />
          </div>
          <div className="flex flex-col mt-16 items-start justify-start gap-2">
            <label htmlFor="" className="w-full text-left">
              Content Blog in English
            </label>
            <QuillEditor value={texten} onChange={setTextEn} />
          </div>
          <div className="flex flex-col mt-5 items-start justify-start gap-2">
            <label htmlFor="" className="w-full text-left">
              Content Blog in Czech
            </label>
            <QuillEditor value={textcz} onChange={setTextCz} />
          </div>
          <div className="flex flex-col mt-5 items-start justify-start gap-2">
            <label htmlFor="" className="w-full text-right">
              محتوي المدونه
            </label>
            <QuillEditor value={textar} onChange={setTextAr} />
          </div>
          <button
            type="submit"
            className="bg-white text-black px-10 py-4 my-5 rounded-md hover:bg-white/50 duration-300"
          >
            Submit
          </button>
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
        </form>
      </div>
    </div>
  );
}
