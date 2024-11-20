"use client";
import {
  deleteImage,
  getCategories,
  getProject,
  updateProject,
  uploadImageToCloudinary,
} from "@/lib/api";
import imageCompression from "browser-image-compression";
import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { DeleteIcon } from "lucide-react";
import QuillEditor from "@/app/add/quill";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const { idProject } = params;

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
  const [Images12, setImages12] = useState([]);
  const [_, setRerender] = useState(false);
  const [ImagesBehindTheScene, setImagesBehindTheScene] = useState([]);
  const [ImagesBehindTheScene1, setImagesBehindTheScene1] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [date, setDate] = useState();
  const [project, setProject] = useState();
  const router = useRouter();

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
    getProject(idProject).then((res) => {
      setProject(res),
        setDate(
          new Date(res?.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        ),
        setImages12(res.images);
      setImagesBehindTheScene1(res.imagesBehindScenes);
      setEditorContent(res.reviewBehindScenes);
    });

    console.log(project, "project from use Effect");
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
      return { name: cr.split(",")[0].trim(), job: cr.split(",")[1]?.trim() };
    });
    crews = crews.filter((item) => item.job !== "");
    videos = Array.from(videos).map((item) =>
      item.value == "" ? null : item.value
    );
    crews = crews.filter((item) => item.job !== undefined);
    crews = crews.filter((item) => item.job !== null);
    crews = crews.filter((item) => item.job !== "");
    crews = crews.filter((item) => item.name !== "" || null || undefined);

    videos = videos.filter((item) => item !== null);
    const data = Object.fromEntries(Form.entries());
    data.thumbnailImage = thumbnailImage;
    data.crews = JSON.stringify(crews);
    data.videos = JSON.stringify(videos);
    data.date = date;

    data.Images = JSON.stringify(Images);
    data.ImagesBehindScenes = ImagesBehindTheScene;
    data.reviewBehindScenes = editorContent;
    setLoading(true);
    console.log(data, date);
    const res = await updateProject(project?._id, data);
    console.log(res);
    setLoading(false);
    if (res) {
      router.push("/");
    }
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
                Name of Project<span className="text-red-600 text-xl"> *</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={project?.name}
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
                <img
                  src={thumbnailImage || project?.thumbnail || ""}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
              </label>
              <input
                type="file"
                defaultValue={project?.thumbnail}
                name="thumbnailImage"
                id="thumbnail"
                onChange={async (e) => {
                  if (!e.target.files[0].type.startsWith("image/")) {
                    toast.warn("Please upload only image files.");
                    e.target.value = "";
                    setThumbnail("");
                    return;
                    // Clear the input if it's not an image
                  }
                  const image = await compressImage(e.target.files[0]);
                  console.log(image, "compress image");
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = async () => {
                    // setImages((prev) => [
                    const result = await uploadImageToCloudinary(reader.result);
                    setThumbnail(result);
                    console.log(reader.result, "image after reader");

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
                defaultValue={project?.date}
                onChange={(e) => setDate(e.target.value)}
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
                defaultValue={project?.category}
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
            <div className="flex flex-col mt-5 items-start justify-start gap-2">
              <label htmlFor="StyleProject">
                Style of Project{" "}
                <span className="text-red-600 text-xl"> *</span>
              </label>
              <select
                name="style"
                id="StyleProject"
                defaultValue={project?.style}
                placeholder="Enter category of project"
                className="w-full rounded-md bg-white text-black px-5 h-10 outline-none"
              >
                <option value="">Select Style</option>
                <option value="tall">Tall</option>
                <option value="wide">Wide</option>
              </select>
            </div>
            <div className="relative flex flex-col mt-5 items-start justify-start gap-2">
              <label htmlFor="videoProject">Videos of Project</label>
              {project?.videos.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  id="videoProject"
                  defaultValue={item}
                  placeholder="Enter video of project"
                  className="w-full videos rounded-md bg-white text-black px-5 h-10 outline-none"
                />
              ))}

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
              <label htmlFor="crewsPorject">Crews of Project</label>
              <div className="grid grid-cols-2 gap-3 w-full">
                {project?.crews.map((item, index) => {
                  return (
                    <input
                      type="text"
                      key={index}
                      defaultValue={`${item.name},${item.job}`}
                      id="crewsPorject"
                      placeholder="Enter crew of project"
                      className="w-full crews rounded-md bg-white text-black px-5 h-10 outline-none"
                    />
                  );
                })}
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
              <label htmlFor="reviewPorject">Review of Project</label>
              <textarea
                type="reviewPorject"
                name="review"
                defaultValue={project?.review}
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
              {Images12.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center relative w-fit mx-auto   justify-center gap-5"
                  >
                    <DeleteIcon
                      onClick={() => {
                        deleteImage(project._id, item.before),
                          setImages12((prev) =>
                            prev.filter((img) => {
                              return img.before !== item.before;
                            })
                          );
                      }}
                      className="absolute top-0 right-0 translate-x-full cursor-pointer  z-10 w-14 text-red-400 h-14"
                    />
                    <div className="-z-10 flex items-center w-full mt-10  justify-center">
                      <label
                        htmlFor="imageBefor"
                        className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
                      >
                        <img
                          src={item.before}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </label>
                    </div>
                    <div className="flex -z-10 items-center w-full mt-10  justify-center">
                      <label
                        htmlFor="imageAfter"
                        className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
                      >
                        <img
                          src={item.after}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
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
                      {Images[index]?.before ? (
                        <img
                          src={Images[index].before}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>Upload Image Before</span>
                      )}
                    </label>
                    <input
                      type="file"
                      required
                      id={`imageBefor${index}`}
                      onChange={async (e) => {
                        if (!e.target.files[0].type.startsWith("image/")) {
                          toast.warn("Please upload only image files.");
                          e.target.value = "";
                          Images[index] = null;
                          Images[index].before = null;
                          setRerender((prev) => !prev);

                          return;
                          // Clear the input if it's not an image
                        }
                        e.preventDefault();
                        const image = await compressImage(e.target.files[0]);
                        console.log(image, "compress image");
                        const reader = new FileReader();
                        reader.readAsDataURL(image);
                        reader.onload = async () => {
                          const result = await uploadImageToCloudinary(
                            reader.result
                          );
                          console.log(result);
                          Images[index] = {};
                          Images[index].before = result;
                          setRerender((prev) => !prev);

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
                      htmlFor={`imageAfter${index + 0.5}`}
                      className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
                    >
                      {Images[index]?.after ? (
                        <img
                          src={Images[index].after}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>
                          Upload Image After
                          <span className="text-red-600 text-xl"> *</span>
                        </span>
                      )}
                    </label>
                    <input
                      required
                      type="file"
                      id={`imageAfter${index + 0.5}`}
                      onChange={async (e) => {
                        if (!e.target.files[0].type.startsWith("image/")) {
                          toast.warn("Please upload only image files.");
                          e.target.value = "";
                          Images[index].after = null;
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
                          console.log(result);
                          Images[index].after = result;
                          setRerender((prev) => !prev);

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
                {ImagesBehindTheScene1.map((item, index) => {
                  return (
                    <label
                      key={index}
                      htmlFor={`imageBehindTheScene`}
                      className=" w-[250px] relative  h-[250px]  flex justify-center text-center items-center border-white border-2 border-dashed"
                    >
                      <img
                        src="https://cdn.prod.website-files.com/66eaae371a3339a1873d1c70/66f2cae281b321c33c489471_bin-white.png"
                        alt="delete"
                        onClick={() => {
                          deleteImage(project._id, item),
                            setImagesBehindTheScene1((prev) =>
                              prev.filter((img) => {
                                return img !== item;
                              })
                            );
                        }}
                        className="w-20 absolute top-1/2 translate-x-1/2 cursor-pointer -translate-y-1/2 right-1/2 h-20 z-50"
                      />
                      <img
                        src={item}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </label>
                  );
                })}
                {numImgesBehindTheSceneInput.map((_, index) => {
                  return (
                    <div key={index} className="w-fit h-fit">
                      <label
                        htmlFor={`imageBehindTheScene${index}`}
                        className=" w-[250px] h-[250px] cursor-pointer flex justify-center text-center items-center border-white border-2 border-dashed"
                      >
                        {ImagesBehindTheScene[index] ? (
                          <img
                            src={ImagesBehindTheScene[index]}
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
                            console.log(result);
                            ImagesBehindTheScene[index] = result;
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
              <label htmlFor="">Review Behind The Scene of Project</label>
              <QuillEditor value={editorContent} onChange={setEditorContent} />
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
