"use client";
import { deleteImage, getProject, updateProject } from "@/lib/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const { idProject } = params;
  const [project, setProject] = useState();
  const [ProjectName, setProjectName] = useState();
  const [image, setImage] = useState();
  const [ProjectDate, setProjectDate] = useState();
  const [ProjectReview, setProjectReview] = useState();
  const [ProjectImages, setProjectImages] = useState();
  const [projectReviewBehind, setprojectReviewBehind] = useState();
  const [ImagesprojectReviewBehind, setImagesprojectReviewBehind] = useState();
  const [ProjectCrews, setProjectCrews] = useState();
  const [ProjectVideo, setProjectVideo] = useState();
  const [loading, setLoading] = useState(false);
  const getproject = async () => {
    try {
      const data = await getProject(idProject);
      setProject(data);
      setProjectName(project.name);
      setProjectDate(project.date);
      setProjectReview(project.review);
      setprojectReviewBehind(project.reviewBehindScenes);
      setProjectImages(project.images);
      setImagesprojectReviewBehind(project.imagesBehindScenes);
      setProjectVideo(project.videos);
      setProjectCrews(project.crews);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getproject();
  }, [project]);

  const [images, setImages] = useState([]);
  const [imageScene, setImagesBehined] = useState([]);
  const [IncaseInput, setIncaseInput] = useState([]);
  const [VideoInput, setVideoInput] = useState([]);
  const hundleForm = async (e) => {
    e.preventDefault();
    const formdata = document.getElementById("form");
    const form = new FormData(formdata);
    // HUNDLE Crews ==========================================
    let crews = document.querySelectorAll(".crews");
    crews = Array.from(crews).map((item) =>
      item.value == "" ? null : item.value
    );
    crews = crews.filter((item) => item !== null);
    crews = crews.map((cr) => {
      return { name: cr.split(",")[0].trim(), job: cr.split(",")[1].trim() };
    });
    // ======================================================
    // HUNDLE Videos ===========================================
    let videos = document.querySelectorAll(".videos");
    videos = Array.from(videos).map((item) =>
      item.value == "" ? null : item.value
    );
    videos = videos.filter((item) => item !== null);
    //====================================================
    //HUNDLE IMAGES=========================================
    //=======================================================================
    const data = Object.fromEntries(form.entries());
    data.Images = JSON.stringify(images);
    data.crews = JSON.stringify(crews);
    data.videos = JSON.stringify(videos);
    data.thumbnailImage = image;
    data.ImagesBehindScenes = JSON.stringify(imageScene);
    console.log(data, "form");
    await updateProject(idProject, data);
  };
  if (loading) {
    return <p>loading...</p>;
  }
  return (
    <form
      action=""
      onSubmit={hundleForm}
      method="post"
      id="form"
      className="w-full mx-auto flex flex-col items-center justify-center"
    >
      <div className="flex justify-center items-center h-fit w-full ">
        <div className="bg-green-400 text-3xl h-full mb-11 w-fit p-4 text-center text-white font-bold cursor-pointer">
          Edit {ProjectName} Project
        </div>
        <div className="bg-blue-400 text-3xl h-full mb-11 w-fit p-4 text-center text-white font-bold cursor-pointer">
          <Link href="/" className="w-full h-full">
            Back to Projects
          </Link>
        </div>
      </div>
      <input
        name="name"
        type="text"
        placeholder={`${ProjectName}`}
        className="border-b-4 border-slate-500 outline-none h-10 w-[400px]  pl-2 text-2xl text-stone-600  my-5"
      />
      <label
        htmlFor="thumbnail"
        className="inline-block cursor-pointer border-none text-center  outline-none h-10 w-[400px]  pl-2 placeholder:text-2xl text-slate-600 text-3xl my-5"
      >
        Choose Thmbnail
      </label>
      {image ? (
        <img
          src={image}
          alt="image"
          className="w-20 h-20  mb-10 object-cover"
        />
      ) : (
        <img
          src={`${project?.thumbnail}`}
          alt="image"
          className="w-20 h-20  mb-10 object-cover"
        />
      )}

      <input
        name="thumbnailImage"
        id="thumbnail"
        onChange={(e) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
            // This will be a base64 string
          };
          reader.readAsDataURL(e.target.files[0]);
          // setImage1(e.target.files[0]);
          // setImage(URL.createObjectURL(e.target.files[0]));
        }}
        type="file"
        placeholder="Enter Name Of The project"
        className="border-b-4 cursor-pointer border-slate-500 outline-none h-10 w-[400px]  pl-2 placeholder:text-2xl text-stone-600 text-3xl my-5 hidden "
      />
      <p className="bg-slate-500 text-white">
        {new Date(ProjectDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <input
        name="date"
        type="date"
        placeholder={`${ProjectDate}`}
        className="border-b-4 border-slate-500 outline-none h-10 w-[400px]  pl-2 placeholder:text-2xl text-stone-600 text-3xl my-5"
      />
      {/* Video Fro project ================================================================================================================================= */}
      {/* Video Fro project ================================================================================================================================= */}
      {/* Video Fro project ================================================================================================================================= */}
      {/* Video Fro project ================================================================================================================================= */}
      {/* Video Fro project ================================================================================================================================= */}
      <p className=" outline-none h-fit w-fit text-center pl-2 placeholder:text-2xl text-stone-600 text-3xl my-5 cursor-pointer">
        Video
      </p>
      <button
        onClick={(e) => {
          e.preventDefault();
          setVideoInput((prev) => [...prev, 1]);
        }}
        className="text-green-600 bg-green-200 rounded-lg font-semibold tracking-widest py-3 px-4 uppercase"
      >
        add Input
      </button>
      <div className="grid grid-cols-2 gap-2 mx-auto my-5">
        {ProjectVideo.map((video, i) => {
          return (
            <input
              type="text"
              key={i}
              placeholder={video}
              className="videos border-b-2 border-slate-500 outline-none h-10 w-[400px]  pl-2 placeholder:text-2xl text-stone-600 text-2xl"
            />
          );
        })}
        {VideoInput?.map((num) => (
          <input
            key={num}
            type="text"
            placeholder="Enter Your Video link"
            className="videos border-b-2 border-slate-500 outline-none h-10 w-[400px]  pl-2 placeholder:text-2xl text-stone-600 text-2xl"
          />
        ))}{" "}
      </div>
      {/* crew Fro project ================================================================================================================================= */}
      {/* crew Fro project ================================================================================================================================= */}
      {/* crew Fro project ================================================================================================================================= */}
      {/* crew Fro project ================================================================================================================================= */}
      {/* crew Fro project ================================================================================================================================= */}
      <p className=" outline-none h-fit w-fit text-center pl-2 placeholder:text-2xl text-stone-600 text-3xl my-5 cursor-pointer">
        Crew
      </p>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIncaseInput((prev) => [...prev, 1]);
        }}
        className="text-green-600 bg-green-200 rounded-lg font-semibold tracking-widest py-3 px-4 uppercase"
      >
        add Input
      </button>
      <div className="grid grid-cols-2 gap-2 mx-auto my-5">
        {ProjectCrews.map((item, i) => {
          return (
            <input
              key={i}
              placeholder={`${item.name},${item.job}`}
              type="text"
              className="crews border-b-2 border-slate-500 outline-none  pl-2 placeholder:text-xl text-stone-600 text-2xl"
            />
          );
        })}
        {IncaseInput?.map((num) => (
          <input
            key={num}
            type="text"
            placeholder="Name , Job"
            className="crews border-b-2 border-slate-500 outline-none  pl-2 placeholder:text-xl text-stone-600 text-2xl"
          />
        ))}
      </div>
      <textarea
        name="review"
        type="text"
        placeholder={ProjectReview}
        className="border-2 border-slate-500 outline-none h-24 w-[400px]  pl-2 placeholder:text-2xl text-stone-600 text-3xl my-5"
      ></textarea>
      {/* images Fro project ================================================================================================================================= */}
      {/* images Fro project ================================================================================================================================= */}
      {/* images Fro project ================================================================================================================================= */}
      {/* images Fro project ================================================================================================================================= */}
      {/* images Fro project ================================================================================================================================= */}
      <label
        htmlFor="image"
        className=" outline-none h-fit w-[400px] text-center pl-2 placeholder:text-2xl text-stone-600 text-3xl my-5 cursor-pointer"
      >
        Choose Image For Project
      </label>
      <input
        onChange={(e) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImages((prev) => [...prev, reader.result]);
            // This will be a base64 string
          };
          reader.readAsDataURL(e.target.files[0]);
          // setImage(URL.createObjectURL(e.target.files[0]));
        }}
        type="file"
        id="image"
        placeholder="Enter Name Of The project"
        className="border-b-2 border-slate-500 outline-none hidden h-10 w-[400px] text-center pl-2 placeholder:text-2xl text-stone-600 text-2xl "
      />
      <div className="flex flex-wrap gap-2">
        {ProjectImages.map((image, i) => {
          // const img = URL.createObjectURL(image);
          // console.log(`http://localhost:4000/${image}`);
          return (
            <img
              onClick={() => deleteImage(idProject, image)}
              key={i}
              alt="image"
              src={image}
              className="w-20 h-20 object-cover"
            />
          );
        })}
        {images.map((image, i) => {
          return (
            <img
              key={i}
              src={image}
              alt={image}
              className="w-20 h-20 object-cover"
            />
          );
        })}
      </div>
      {/* images Fro Behined the scene project ================================================================================================================================= */}
      {/* images Fro Behined the scene project ================================================================================================================================= */}
      {/* images Fro Behined the scene project ================================================================================================================================= */}
      {/* images Fro Behined the scene project ================================================================================================================================= */}
      {/* images Fro Behined the scene project ================================================================================================================================= */}
      <label
        htmlFor="imageScene"
        className=" outline-none h-fit w-[400px] text-center pl-2 placeholder:text-2xl text-stone-600 text-3xl my-5 cursor-pointer"
      >
        Choose Image For Behind Scenes Scetion
      </label>
      <input
        onChange={(e) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagesBehined((prev) => [...prev, reader.result]);
            // This will be a base64 string
          };
          reader.readAsDataURL(e.target.files[0]);
          // setImage(URL.createObjectURL(e.target.files[0]));
        }}
        multiple
        type="file"
        id="imageScene"
        placeholder="Enter Name Of The project"
        className="border-b-2 hidden border-slate-500 outline-none h-10 w-[400px] text-center pl-2 placeholder:text-2xl text-stone-600 text-2xl"
      />
      <div className="flex flex-wrap gap-2">
        {ImagesprojectReviewBehind.map((image, i) => {
          return (
            <img
              key={i}
              onClick={() => deleteImage(idProject, image)}
              src={`${image}`}
              alt={image}
              className="w-20 h-20 object-cover"
            />
          );
        })}
        {imageScene.map((image, i) => {
          return (
            <img
              key={i}
              src={image}
              alt={image}
              className="w-20 h-20 object-cover"
            />
          );
        })}
      </div>
      <textarea
        name="reviewBehindScenes"
        type="text"
        placeholder={projectReviewBehind}
        className="border-2 border-slate-500 outline-none h-24 w-[400px]  pl-2 placeholder:text-2xl text-stone-600 text-3xl my-5"
      ></textarea>
      <button
        type="submit"
        className="py-[15px] px-[50px] bg-blue-500 text-white font-semibold font-mono text-3xl tracking-wide rounded-lg my-11"
      >
        Update
      </button>
    </form>
  );
};

export default Page;
