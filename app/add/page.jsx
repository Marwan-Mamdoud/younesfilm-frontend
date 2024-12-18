"use client";
import { addProject, getCategories, uploadImageToCloudinary } from "@/lib/api";
import imageCompression from "browser-image-compression";
import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import QuillEditor from "./quill";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.5, // Compress to a max of 1MB per image
      maxWidthOrHeight: 1024, // Resize to a max width or height
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };
  const [_, setRerender] = useState(false); // حالة وهمية لتحفيز إعادة التصيير
  const [loading, setLoading] = useState(false);
  const [numVideosInput, setNumVideosInput] = useState([]);
  const [numCrewsInput, setNumCrewsInput] = useState([]);
  const [numImgesInput, setNumImagesInput] = useState([]);
  const [numImgesBehindTheSceneInput, setNumImagesBehindTheSceneInput] =
    useState([]);
  const [thumbnailImage, setThumbnail] = useState();
  const [categories, setCategories] = useState();
  const [crewen, setcrewen] = useState([]);
  const [crewcz, setcrewcz] = useState([]);
  const [crewar, setcrewar] = useState([]);

  // const Images  = [];
  const [Images, setImages] = useState([]);
  const [ImagesBehindTheScene, setImagesBehindTheScene] = useState([]);
  const [editorContentEn, setEditorContentEn] = useState("");
  const [editorContentCz, setEditorContentCz] = useState("");
  const [editorContentAr, setEditorContentAr] = useState("");

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  const router = useRouter();
  const hundleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const Form = new FormData(form);
    let crewsen = document.querySelectorAll(".crewsen");
    let crewscz = document.querySelectorAll(".crewscz");
    let crewsar = document.querySelectorAll(".crewsar");
    let names = document.querySelectorAll(".name");
    // ====================================================================
    names = Array.from(names).map((item) => item.value);
    names[0] = { en: names[0] };
    names[1] = { cz: names[1] };
    names[2] = { ar: names[2] };
    // ======================================================================
    const ReviewBehindTheScene = [
      { en: editorContentEn },
      { cz: editorContentCz },
      { ar: editorContentAr },
    ];
    // ========================================================================
    // ======================================================================
    let Review = document.querySelectorAll(".review");
    Review = Array.from(Review).map((item) => item.value);
    Review[0] = { en: Review[0] };
    Review[1] = { cz: Review[1] };
    Review[2] = { ar: Review[2] };
    // ========================================================================
    // crewsen = Array.from(crewsen).map((item) =>
    //   item.value == "" ? null : item.value
    // );
    // crewsen = crewsen.filter((item) => item !== null);
    // crewsen = crewsen.map((cr) => {
    //   return { name: cr.split(",")[0]?.trim(), job: cr.split(",")[1]?.trim() };
    // });
    // crewsen = crewsen.filter((item) => item.job !== undefined);
    // crewsen = crewsen.filter((item) => item.job !== null);
    // crewsen = crewsen.filter((item) => item.job !== "");
    // crewsen = crewsen.filter((item) => item.name !== "" || null || undefined);
    // // console.log(crews);
    // // ==================================================================================
    // // ========================================================================
    // crewscz = Array.from(crewscz).map((item) =>
    //   item.value == "" ? null : item.value
    // );
    // crewscz = crewscz.filter((item) => item !== null);
    // crewscz = crewscz.map((cr) => {
    //   return { name: cr.split(",")[1]?.trim(), job: cr.split(",")[0]?.trim() };
    // });
    // crewscz = crewscz.filter((item) => item.job !== undefined);
    // crewscz = crewscz.filter((item) => item.job !== null);
    // crewscz = crewscz.filter((item) => item.job !== "");
    // crewscz = crewscz.filter((item) => item.name !== "" || null || undefined);
    // // console.log(crews);
    // // ==================================================================================
    // // ========================================================================
    // crewsar = Array.from(crewsar).map((item) =>
    //   item.value == "" ? null : item.value
    // );
    // crewsar = crewsar.filter((item) => item !== null);
    // crewsar = crewsar.map((cr) => {
    //   return { name: cr.split(",")[1]?.trim(), job: cr.split(",")[0]?.trim() };
    // });
    // crewsar = crewsar.filter((item) => item.job !== undefined);
    // crewsar = crewsar.filter((item) => item.job !== null);
    // crewsar = crewsar.filter((item) => item.job !== "");
    // crewsar = crewsar.filter((item) => item.name !== "" || null || undefined);
    // console.log(crews);
    const crewsTTest = document.querySelectorAll(".crew");
    crewsen = Array.from(crewsTTest).map((item) => {
      const obj = {};
      if (item.querySelector(".job").value.trim() == "") return;
      obj.name = item.querySelector(".name").value;
      obj.job = item.querySelector(".job").value;
      return obj;
    });
    const crewsTTestcz = document.querySelectorAll(".crewcz");
    crewscz = Array.from(crewsTTestcz).map((item) => {
      const obj = {};
      if (item.querySelector(".job").value == "") return;
      obj.name = item.querySelector(".name").value;
      obj.job = item.querySelector(".job").value;
      return obj;
    });
    const crewsTTestar = document.querySelectorAll(".crewar");
    crewsar = Array.from(crewsTTestar).map((item) => {
      const obj = {};
      if (item.querySelector(".job").value == "") return;
      obj.name = item.querySelector(".job").value;
      obj.job = item.querySelector(".name").value;
      return obj;
    });
    let crews = [
      { en: crewsen.filter((item) => item !== undefined) },
      { cz: crewscz.filter((item) => item !== undefined) },
      { ar: crewsar.filter((item) => item !== undefined) },
    ];
    // ==================================================================================
    let videos = document.querySelectorAll(".videos");
    videos = Array.from(videos).map((item) =>
      item.value == "" ? null : item.value
    );

    videos = videos.filter((item) => item !== null);

    // ===========================================================================
    const data = Object.fromEntries(Form.entries());
    data.thumbnailImage = thumbnailImage;
    data.crews = JSON.stringify(crews);
    data.videos = JSON.stringify(videos);
    data.Images = JSON.stringify(Images);
    data.review = JSON.stringify(Review);
    data.ImagesBehindScenes = ImagesBehindTheScene;
    data.reviewBehindScenes = JSON.stringify(ReviewBehindTheScene);
    data.name = JSON.stringify(names);
    //===================================================================
    //===================================================================
    //===================================================================

    setLoading(true);

    const res = await addProject(data);
    console.log(data);

    setLoading(false);
    // if (res) {
    //   router.push("/");
    // }
  };

  return (
    <>
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
                Name of Project en{" "}
                <span className="text-red-600 text-xl"> *</span>
              </label>
              <input
                type="text"
                name="name"
                required
                id="nameProject"
                placeholder="Enter name of project"
                className="w-full name rounded-md bg-white text-black px-5 h-10 outline-none"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <label htmlFor="nameProject">
                Name of Project cz{" "}
                <span className="text-red-600 text-xl"> *</span>
              </label>
              <input
                type="text"
                name="name"
                id="nameProject"
                placeholder="Enter name of project"
                className="w-full name rounded-md bg-white text-black px-5 h-10 outline-none"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <label htmlFor="nameProject">
                Name of Project ar{" "}
                <span className="text-red-600 text-xl"> *</span>
              </label>
              <input
                type="text"
                name="name"
                id="nameProject"
                placeholder="Enter name of project"
                className="w-full name rounded-md bg-white text-black px-5 h-10 outline-none"
              />
            </div>
            <div className="flex items-center mx-auto mt-10  justify-center">
              <label
                htmlFor="thumbnail"
                className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
              >
                {thumbnailImage ? (
                  <img
                    loading="lazy"
                    src={thumbnailImage || ""}
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
            <div className="flex flex-col mt-5 items-start justify-start gap-2">
              <label htmlFor="dateProject">
                Date of Project <span className="text-red-600 text-xl"> *</span>
              </label>
              <input
                type="date"
                name="date"
                required
                id="dateProject"
                placeholder="Enter name of project"
                className="w-full rounded-md bg-white text-black px-5 h-10 outline-none"
              />
            </div>
            <div className="flex flex-col mt-5 items-start justify-start gap-2">
              <label htmlFor="categoryProject">
                Category of Project{" "}
                <span className="text-red-600 text-xl"> *</span>
              </label>
              <select
                name="category"
                id="categoryProject"
                required
                defaultValue="Select category"
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
            </div>
            <div className="flex flex-col mt-5 items-start justify-start gap-2">
              <label htmlFor="StyleProject">
                Style of Project{" "}
                <span className="text-red-600 text-xl"> *</span>
              </label>
              <select
                name="style"
                id="StyleProject"
                required
                defaultValue="Select category"
                placeholder="Enter category of project"
                className="w-full rounded-md bg-white text-black px-5 h-10 outline-none"
              >
                <option value="">Select Style</option>
                <option value="">null</option>
                <option value="tall">Tall</option>
                <option value="wide">Wide</option>
              </select>
            </div>
            <div className="relative flex flex-col mt-5 items-start justify-start gap-2">
              <label htmlFor="">Videos of Project</label>

              <input
                type="text"
                id=""
                placeholder="Enter video of project"
                className="w-full videos rounded-md bg-white text-black px-5 h-10 outline-none"
              />

              <FaPlusCircle
                className="w-8 h-8 text-gray-400 absolute -top-1 -left-10 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setNumVideosInput((prev) => [...prev, 1]);
                }}
              />
              {numVideosInput.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder="Enter video of project"
                  className="w-full videos rounded-md bg-white mt-5 text-black px-5 h-10 outline-none"
                />
              ))}
            </div>
            <div className="relative flex flex-col mt-5 items-start justify-start gap-2">
              <FaPlusCircle
                className="w-8 h-8 text-gray-400 absolute -top-1 -left-10 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("done click", numCrewsInput);

                  setNumCrewsInput((prev) => [...prev, 1]);
                }}
              />
              <label htmlFor="">Crews of Project en</label>
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Client"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Post Production"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Production House"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Agency"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Executive Producer"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Director"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="DOP"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Focus Puller"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Editor"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Colorist"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Ad"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Line Producer"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Gaffer"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Hair dresser"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Makeup Artist"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Dress by"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Casting Director"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crew items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Dancer"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Name of Crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>

                {numCrewsInput.map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 crew items-center justify-center gap-5"
                  >
                    <input
                      type="text"
                      defaultValue=""
                      placeholder="job of Crew"
                      className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                    />
                    <input
                      type="text"
                      defaultValue=""
                      placeholder="Name of Crew"
                      className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                    />
                  </div>
                ))}
              </div>
              <label htmlFor="">Crews of Project cz</label>
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Klient"
                    placeholder="job of crew"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="name of crew"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Postprodukce"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Produkční dům"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Agentura"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Výkonný producent"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Ředitel"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="DOP"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Focus Puller"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Editor"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Kolorista"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Ad"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Výrobce linky"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Gaffer"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Kadeřník"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Vizážistka"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Šaty od"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Castingový ředitel"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewcz items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Tanečnice"
                    placeholder="Enter crew of project"
                    className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>

                {numCrewsInput.map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 crewcz items-center justify-center gap-5"
                  >
                    <input
                      type="text"
                      defaultValue=""
                      placeholder="Enter job crew "
                      className="w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                    />
                    <input
                      type="text"
                      defaultValue=""
                      placeholder="Enter name crew"
                      className="w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                    />
                  </div>
                ))}
              </div>
              <label htmlFor="">Crews of Project ar</label>
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="عميل"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="مرحله ما بعد الانتاج"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="دار الانتاج"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="المؤسسه"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="المنتج التنفيذي"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="المدير"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="DOP"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="مجتذب التركيز"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="المحرر"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="الملون"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="AD"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="منتج خط الانتاج"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="Gaffer"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="مصفف الشعر"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="خبير التجميل"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="الفستان من تصميم"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="مدير أختيار الممثلين"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 crewar items-center justify-center gap-5">
                  <input
                    type="text"
                    defaultValue="الراقص"
                    placeholder="Enter crew of project"
                    className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter crew of project"
                    className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                </div>

                {numCrewsInput.map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 crewar items-center justify-center gap-5"
                  >
                    <input
                      type="text"
                      defaultValue=""
                      placeholder=" ادخل وظيفه العامل"
                      className=" w-full crewsen name rounded-md bg-white text-black px-5 h-10 outline-none"
                    />
                    <input
                      type="text"
                      defaultValue=""
                      placeholder="ادخل اسم العامل"
                      className=" w-full crewsen job rounded-md bg-white text-black px-5 h-10 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col mt-5 items-start justify-start gap-2">
              <label htmlFor="reviewPorject">Review of Project en</label>
              <textarea
                type="reviewPorject"
                name="review"
                id="reviewPorject"
                placeholder="Enter Review of project"
                className="w-full review rounded-md bg-white h-28 text-black px-5 py-3 outline-none"
              />
            </div>
            <div className="flex flex-col mt-5 items-start justify-start gap-2">
              <label htmlFor="reviewPorject">Review of Project cz</label>
              <textarea
                type="reviewPorject"
                name="review"
                id="reviewPorject"
                placeholder="Enter Review of project"
                className="w-full review rounded-md bg-white h-28 text-black px-5 py-3 outline-none"
              />
            </div>
            <div className="flex flex-col mt-5 items-start justify-start gap-2">
              <label htmlFor="reviewPorject">Review of Project ar</label>
              <textarea
                type="reviewPorject"
                name="review"
                id="reviewPorject"
                placeholder="Enter Review of project"
                className="w-full review rounded-md bg-white h-28 text-black px-5 py-3 outline-none"
              />
            </div>
            <div className="grid grid-cols-1 my-10 w-full  gap-5">
              <div className="w-fit mx-auto relative text-white cursor-default  font-semibold text-3xl">
                Before and After Images
                <FaPlusCircle
                  className="w-8 h-8 text-gray-400 absolute top-0 -left-10 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();

                    setNumImagesInput((prev) => [...prev, 1]);
                  }}
                />
              </div>
              <div className="flex items-center w-fit mx-auto   justify-center gap-5">
                <div className="flex items-center w-full mt-10  justify-center">
                  <label
                    htmlFor="imageBefor"
                    className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
                  >
                    {Images[0] ? (
                      <img
                        loading="lazy"
                        src={Images[0].before}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>Upload Image Before*</span>
                    )}
                  </label>

                  <input
                    type="file"
                    id="imageBefor"
                    onChange={async (e) => {
                      // e.preventDefault();
                      if (!e.target.files[0].type.startsWith("image/")) {
                        toast.warn("Please upload only image files.");
                        e.target.value = "";
                        Images[0] = null;
                        setRerender((prev) => !prev);

                        return;
                        // Clear the input if it's not an image
                      }
                      const image = await compressImage(e.target.files[0]);
                      const reader = new FileReader();
                      reader.readAsDataURL(image);
                      reader.onload = async () => {
                        // setImages((prev) => [
                        const result = await uploadImageToCloudinary(
                          reader.result
                        );
                        Images[0] = {};
                        Images[0].before = result;
                        // ]);
                        setRerender((prev) => !prev);
                        console.log("image", result);

                        // This will be a base64 string,
                      };
                      console.log(Images, "image after reader");
                    }}
                    className="w-full rounded-md hidden bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
                <div className="flex items-center w-full mt-10  justify-center">
                  <label
                    htmlFor="imageAfter"
                    className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
                  >
                    {Images[0]?.after ? (
                      <img
                        loading="lazy"
                        src={Images[0].after}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>
                        Upload Image After{" "}
                        <span className="text-red-600 text-xl"> *</span>
                      </span>
                    )}
                  </label>
                  <input
                    type="file"
                    id="imageAfter"
                    onChange={async (e) => {
                      if (!e.target.files[0].type.startsWith("image/")) {
                        toast.warn("Please upload only image files.");
                        e.target.value = "";
                        Images[0].after = null;
                        setRerender((prev) => !prev);

                        return;
                        // Clear the input if it's not an image
                      }
                      // e.preventDefault();
                      const image = await compressImage(e.target.files[0]);
                      console.log(image, "compress image");
                      const reader = new FileReader();
                      reader.readAsDataURL(image);
                      reader.onload = async () => {
                        // setImages((prev) => [
                        const result = await uploadImageToCloudinary(
                          reader.result
                        );
                        Images[0].after = result;
                        // ]);
                        setRerender((prev) => !prev);
                        console.log("image", result);
                        // This will be a base64 string
                      };
                      console.log(Images, "image after reader");
                    }}
                    className="w-full rounded-md hidden bg-white text-black px-5 h-10 outline-none"
                  />
                </div>
              </div>
              {numImgesInput.map((_, index) => (
                <div
                  key={index}
                  className="flex items-center w-fit mx-auto   justify-center gap-5"
                >
                  <div className="flex items-center w-full mt-10  justify-center">
                    <label
                      htmlFor={`imageBefor${index}`}
                      className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
                    >
                      {Images[index + 1]?.before ? (
                        <img
                          loading="lazy"
                          src={Images[index + 1].before}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>Upload Image Before*</span>
                      )}
                    </label>
                    <input
                      required
                      type="file"
                      id={`imageBefor${index}`}
                      onChange={async (e) => {
                        // e.preventDefault();
                        if (!e.target.files[0].type.startsWith("image/")) {
                          toast.warn("Please upload only image files.");
                          e.target.value = null;
                          Images[index + 1] = null;
                          setRerender((prev) => !prev);

                          return;
                          // Clear the input if it's not an image
                        }
                        const image = await compressImage(e.target.files[0]);
                        console.log(image, "compress image");
                        const reader = new FileReader();
                        reader.readAsDataURL(image);
                        reader.onload = async () => {
                          console.log(Images, "before ittrable");
                          const result = await uploadImageToCloudinary(
                            reader.result
                          );
                          Images[index + 1] = {};
                          Images[index + 1].before = result;
                          // ]);
                          setRerender((prev) => !prev);
                          console.log("image", result);

                          // This will be a base64 string
                        };
                        console.log(
                          Images,
                          Images.length,
                          index,
                          "image after reader"
                        );
                      }}
                      className="w-full rounded-md hidden bg-white text-black px-5 h-10 outline-none"
                    />
                  </div>
                  <div className="flex items-center w-full mt-10  justify-center">
                    <label
                      htmlFor={`imageAfter${index}`}
                      className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
                    >
                      {Images[index + 1]?.after ? (
                        <img
                          loading="lazy"
                          src={`${Images[index + 1].after}`}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>
                          Upload Image After{" "}
                          <span className="text-red-600 text-xl"> *</span>
                        </span>
                      )}
                    </label>
                    <input
                      required
                      type="file"
                      id={`imageAfter${index}`}
                      onChange={async (e) => {
                        if (!e.target.files[0].type.startsWith("image/")) {
                          toast.warn("Please upload only image files.");
                          e.target.value = null;
                          Images[index + 1].after = null;
                          setRerender((prev) => !prev);

                          return;
                          // Clear the input if it's not an image
                        }
                        const image = await compressImage(e.target.files[0]);
                        console.log(image, "compress image");
                        const reader = new FileReader();
                        reader.readAsDataURL(image);
                        reader.onload = async () => {
                          const result = await uploadImageToCloudinary(
                            reader.result
                          );
                          Images[index + 1].after = result;
                          // ]);
                          setRerender((prev) => !prev);
                          console.log("image", result);

                          // This will be a base64 string
                        };
                        console.log(Images, index, "image after reader");
                      }}
                      className="w-full rounded-md hidden bg-white text-black px-5 h-10 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col mt-5 items-center justify-center gap-3">
              <div className="w-fit mx-auto relative text-white cursor-default mb-5  font-semibold text-3xl">
                Behind The Scene Images
                <FaPlusCircle
                  className="w-8 h-8 text-gray-400 absolute top-0 -left-10 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("dine");

                    setNumImagesBehindTheSceneInput((prev) => [...prev, 1]);
                  }}
                />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-5">
                <label
                  htmlFor={`imageBehindTheScene`}
                  className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
                >
                  {ImagesBehindTheScene[0] ? (
                    <img
                      loading="lazy"
                      src={ImagesBehindTheScene[0]}
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>Behind The Scene Images*</span>
                  )}
                </label>{" "}
                <input
                  onChange={async (e) => {
                    if (!e.target.files[0].type.startsWith("image/")) {
                      toast.warn("Please upload only image files.");
                      e.target.value = "";
                      setRerender((prev) => !prev);

                      return;
                      // Clear the input if it's not an image
                    }
                    const image = await compressImage(e.target.files[0]);
                    console.log(image, "compress image");
                    const reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = async () => {
                      const result = await uploadImageToCloudinary(
                        reader.result
                      );
                      ImagesBehindTheScene[0] = result;
                      console.log("image", result);

                      setRerender((prev) => !prev);
                      // This will be a base64 string
                    };
                  }}
                  type="file"
                  id="imageBehindTheScene"
                  placeholder="Enter name of project"
                  className="w-full hidden rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                {numImgesBehindTheSceneInput.map((_, index) => {
                  return (
                    <div key={index} className="w-fit h-fit">
                      <label
                        htmlFor={`imageBehindTheScene${index}`}
                        className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
                      >
                        {ImagesBehindTheScene[index + 1] ? (
                          <img
                            loading="lazy"
                            src={ImagesBehindTheScene[index + 1]}
                            alt="thumbnail"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>Behind The Scene Image</span>
                        )}
                      </label>{" "}
                      <input
                        type="file"
                        onChange={async (e) => {
                          if (!e.target.files[0].type.startsWith("image/")) {
                            toast.warn("Please upload only image files.");
                            e.target.value = "";
                            setRerender((prev) => !prev);
                            return;
                            // Clear the input if it's not an image
                          }
                          const image = await compressImage(e.target.files[0]);
                          console.log(image, "compress image");
                          const reader = new FileReader();
                          reader.readAsDataURL(image);
                          reader.onload = async () => {
                            const result = await uploadImageToCloudinary(
                              reader.result
                            );
                            ImagesBehindTheScene[index + 1] = result;
                            console.log("image", result);

                            setRerender((prev) => !prev);
                            // This will be a base64 string
                          };
                        }}
                        id={`imageBehindTheScene${index}`}
                        placeholder="Enter name of project"
                        className="w-full hidden rounded-md bg-white text-black px-5 h-10 outline-none"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start mt-10 gap-2">
              <label htmlFor="">Review Behind The Scene of Project en</label>
              <QuillEditor
                value={editorContentEn}
                onChange={setEditorContentEn}
              />
            </div>
            <div className="flex flex-col items-start justify-start mt-10 gap-2">
              <label htmlFor="">Review Behind The Scene of Project cz</label>
              <QuillEditor
                value={editorContentCz}
                onChange={setEditorContentCz}
              />
            </div>
            <div className="flex flex-col items-start justify-start mt-10 gap-2">
              <label htmlFor="">Review Behind The Scene of Project ar</label>
              <QuillEditor
                value={editorContentAr}
                onChange={setEditorContentAr}
              />
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
    </>
  );
};

export default Page;
