"use client";
import { addProject, getCategories } from "@/lib/api";
import imageCompression from "browser-image-compression";
import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import { FaPlusCircle } from "react-icons/fa";

const Page = () => {
  const editorRef = useRef(null);
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.5, // Compress to a max of 1MB per image
      maxWidthOrHeight: 1024, // Resize to a max width or height
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };
  const [loading, setLoading] = useState(false);
  const [numVideosInput, setNumVideosInput] = useState([]);
  const [numCrewsInput, setNumCrewsInput] = useState([]);
  const [numImgesInput, setNumImagesInput] = useState([]);
  const [numImgesBehindTheSceneInput, setNumImagesBehindTheSceneInput] =
    useState([]);
  const [thumbnailImage, setThumbnail] = useState();
  const [categories, setCategories] = useState();
  const [Images, setImages] = useState([]);
  const [ImagesBehindTheScene, setImagesBehindTheScene] = useState([]);
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Type your content here...",
    });

    quill.on("text-change", () => {
      setEditorContent(quill.root.innerHTML); // Store HTML content
    });
  }, []);
  const hundleSubmit = async (e) => {
    e.preventDefault();
    // Your code that uses `document`

    const form = document.getElementById("form");
    const Form = new FormData(form);
    let crews = document.querySelectorAll(".crews");
    let videos = document.querySelectorAll(".videos");

    crews = Array.from(crews).map((item) =>
      item.value == "" ? null : item.value
    );
    crews = crews.filter((item) => item !== null);
    crews = crews.map((cr) => {
      return { name: cr.split(",")[0].trim(), job: cr.split(",")[1].trim() };
    });
    crews = crews.filter((item) => item.job !== "");
    videos = Array.from(videos).map((item) =>
      item.value == "" ? null : item.value
    );
    const ImagesUpdated = [];
    console.log(Images);

    for (let i = Images.length - 1; i > 0; i -= 2) {
      ImagesUpdated.push({
        before: Images[i - 1].before,
        after: Images[i].after,
      });
    }

    videos = videos.filter((item) => item !== null);
    const data = Object.fromEntries(Form.entries());
    data.thumbnailImage = thumbnailImage;
    data.crews = JSON.stringify(crews);
    data.videos = JSON.stringify(videos);
    console.log(ImagesUpdated, "Images");

    data.Images = JSON.stringify(ImagesUpdated);
    data.ImagesBehindScenes = ImagesBehindTheScene;
    data.reviewBehindScenes = editorContent;
    setLoading(true);
    console.log(data);
    await addProject(data);
    setLoading(false);
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
              <label htmlFor="nameProject">Name of Project*</label>
              <input
                type="text"
                name="name"
                required
                id="nameProject"
                placeholder="Enter name of project"
                className="w-full rounded-md bg-white text-black px-5 h-10 outline-none"
              />
            </div>
            <div className="flex items-center mx-auto mt-10  justify-center">
              <label
                htmlFor="thumbnail"
                className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
              >
                {thumbnailImage ? (
                  <img
                    src={thumbnailImage || ""}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>Upload thumbnail*</span>
                )}
              </label>
              <input
                type="file"
                required
                name="thumbnailImage"
                id="thumbnail"
                onChange={async (e) => {
                  // setThumbnail(e.target.files[0]);
                  const image = await compressImage(e.target.files[0]);
                  console.log(image, "compress image");
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    setThumbnail(reader.result);
                    console.log(reader.result, "image after reader");

                    // This will be a base64 string
                  };
                }}
                className="w-full rounded-md hidden bg-white text-black px-5 h-10 outline-none"
              />
            </div>
            <div className="flex flex-col mt-5 items-start justify-start gap-2">
              <label htmlFor="dateProject">Date of Project*</label>
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
              <label htmlFor="categoryProject">Category of Project*</label>
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
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative flex flex-col mt-5 items-start justify-start gap-2">
              <label htmlFor="videoProject">Videos of Project*</label>

              <input
                type="text"
                id="videoProject"
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
                  id="videoProject"
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
              <label htmlFor="crewsPorject">Crews of Project*</label>
              <div className="grid grid-cols-2 gap-3 w-full">
                <input
                  type="text"
                  defaultValue="Agency,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="Executive Producer,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="Director,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="DOP,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="Focus Puller,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="Editor,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="Colorist,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="Ad,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="Line Producer,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="Gaffer,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="Hair dresser,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="Makeup Artist,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="Dress by,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="Casting Director,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  defaultValue="Dancer,"
                  id="crewsPorject"
                  placeholder="Enter crew of project"
                  className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                />
                {numCrewsInput.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    id="crewsPorject"
                    placeholder="Name , Job"
                    className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col mt-5 items-start justify-start gap-2">
              <label htmlFor="reviewPorject">Review of Project*</label>
              <textarea
                type="reviewPorject"
                name="review"
                id="reviewPorject"
                placeholder="Enter Review of project"
                className="w-full rounded-md bg-white h-28 text-black px-5 py-3 outline-none"
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
                      e.preventDefault();
                      const image = await compressImage(e.target.files[0]);
                      console.log(image, "compress image");
                      const reader = new FileReader();
                      reader.readAsDataURL(image);
                      reader.onload = () => {
                        setImages((prev) => [
                          ...prev,
                          { before: reader.result },
                        ]);

                        // This will be a base64 string
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
                    {Images[1] ? (
                      <img
                        src={Images[1].after}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>Upload Image After*</span>
                    )}
                  </label>
                  <input
                    type="file"
                    id="imageAfter"
                    onChange={async (e) => {
                      e.preventDefault();
                      const image = await compressImage(e.target.files[0]);
                      console.log(image, "compress image");
                      const reader = new FileReader();
                      reader.readAsDataURL(image);
                      reader.onload = () => {
                        setImages((prev) => [
                          ...prev,
                          { after: reader.result },
                        ]);

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
                      {Images[index + index + 2] ? (
                        <img
                          src={Images[index + index + 2]?.before}
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
                        e.preventDefault();
                        const image = await compressImage(e.target.files[0]);
                        console.log(image, "compress image");
                        const reader = new FileReader();
                        reader.readAsDataURL(image);
                        reader.onload = () => {
                          console.log(Images, "before ittrable");
                          setImages((prev) => [
                            ...prev,
                            { before: reader.result },
                          ]);

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
                      {Images[index + index + 3] ? (
                        <img
                          src={Images[index + index + 3]?.after}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>Upload Image After*</span>
                      )}
                    </label>
                    <input
                      required
                      type="file"
                      id={`imageAfter${index}`}
                      onChange={async (e) => {
                        const image = await compressImage(e.target.files[0]);
                        console.log(image, "compress image");
                        const reader = new FileReader();
                        reader.readAsDataURL(image);
                        reader.onload = () => {
                          setImages((prev) => [
                            ...prev,
                            { after: reader.result },
                          ]);

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
                    const image = await compressImage(e.target.files[0]);
                    console.log(image, "compress image");
                    const reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = () => {
                      setImagesBehindTheScene((prev) => [
                        ...prev,
                        reader.result,
                      ]);

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
                            src={ImagesBehindTheScene[index + 1]}
                            alt="thumbnail"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>Behind The Scene Image*</span>
                        )}
                      </label>{" "}
                      <input
                        type="file"
                        onChange={async (e) => {
                          const image = await compressImage(e.target.files[0]);
                          console.log(image, "compress image");
                          const reader = new FileReader();
                          reader.readAsDataURL(image);
                          reader.onload = () => {
                            setImagesBehindTheScene((prev) => [
                              ...prev,
                              reader.result,
                            ]);

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
              <label htmlFor="">Review Behind The Scene of Project*</label>
              <div
                ref={editorRef}
                style={{
                  height: "200px",
                  width: "100%",
                  backgroundColor: "white",
                  color: "black",
                }}
              ></div>
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
              }  w-full h-[100dvh] absolute bottom-0 right-0 backdrop-blur-sm `}
            >
              <div
                className={` bg-white w-[500px] shadow-lg  top-1/2 -translate-x-1/2 z-20 -right-1/2 -translate-y-1/2 text-black h-[300px] relative   flex flex-col items-center justify-center gap-5  rounded-lg`}
              >
                <img
                  src="/laoding.png"
                  alt="laoding"
                  className="w-20 h-20 animate-spin  rounded-full"
                ></img>
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
