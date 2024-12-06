"use client";
import { getProject } from "@/lib/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Slider from "react-slick";
import BeforeAfterSlider from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Page = ({ params }) => {
  let lang = localStorage.getItem("language") || "en";
  const index =
    lang == "ar" ? 2 : lang == "cz" ? 1 : lang == "en" ? 0 : !lang ? 0 : 0;
  const { idProject } = params;
  const [project, setProject] = useState();
  const [Video, setVideo] = useState();
  const [Image, setImage] = useState();
  const [VideosHide, setVideosHide] = useState(true);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  useEffect(() => {
    getProject(idProject).then((res) => {
      setProject(res);
    });
  }, [project]);
  let date = project?.date;
  date = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className=" w-full h-full">
      <div className="w-full h-[96dvh] relative">
        <div className="liner-gredient" />
        <img
          src={`${project?.thumbnail}`}
          className="w-full h-full object-cover -z-10  absolute"
          alt="image"
        />
        <p className="text-white uppercase text-6xl text-center tracking-wider cursor-default font-bold absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
          {project?.name[index][lang]}
        </p>
      </div>
      <div className="w-[98%] h-full  bg-white rounded-md mx-auto">
        <div className="mx-auto w-[30dvw] -translate-y-[85%] relative h-[8dvh]">
          <img
            src="https://cdn.prod.website-files.com/65874245451824c5a44fcc6e/65874245451824c5a44fccf8_Pre-order_curve.svg"
            alt="animation"
            className="w-full h-full object-fill -z-10 absolute"
          />
          <div className="text-slate-800 mx-auto w-fit h-fit p-3 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-[40%] border-[1px] border-slate-200 cursor-pointer z-20  rounded-full">
            {/* <Link href="#" className="h-full w-full"> */}
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0002 16.172L18.3642 10.808L19.7782 12.222L12.0002 20L4.22217 12.222L5.63617 10.808L11.0002 16.172V4H13.0002V16.172Z"
                fill="currentColor"
              ></path>
            </svg>
            {/* </Link> */}
          </div>
        </div>
        <div className="mt-12 pb-6 mb-10 relative text-black flex font-sans justify-between items-center w-[95%] mx-auto border-b-[1px] border-black/10">
          <p className="uppercase tracking-widest">
            {project?.category || "Advertisement"}
          </p>
          <p className=" absolute right-1/2 translate-x-1/2  tracking-wide ">
            {new Date(project?.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <Link href="../" className="uppercase tracking-widest">
            View Pervious projects
          </Link>
        </div>
        {project?.videos.length > 0 && (
          <div className="max-w-[1300px] mx-auto mb-10 flex flex-col items-center justify-center gap-5">
            <div className="w-full h-[500px] mx-auto ">
              <iframe
                width={9999}
                height={500}
                className="h-full w-full"
                src={Video || project?.videos[0]}
                // src={Video}
              ></iframe>
            </div>
            <button
              onClick={() => {
                setVideosHide((prev) => !prev);
              }}
              className="p-4 py-3 border-[1px] mx-auto  text-black rounded-full border-black/80 uppercase"
            >
              watch more
            </button>
            <div className={`${VideosHide ? "hidden" : " "}`}>
              <Slider
                {...settings}
                className="bg-black mb-32 w-[1200px] text-black p-5 h-[300px]"
              >
                {project?.videos.map((video, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setVideo(video), console.log("done click", index);
                      }}
                      className="w-[200px] hover:border-4 border-white relative border-0 cursor-pointer px-2  h-[260px]"
                    >
                      {" "}
                      <iframe
                        width={250}
                        height={170}
                        className="h-full absolute  w-[95%] right-2  -z-20"
                        src={video}
                      ></iframe>
                      <div className="z-10 absolute w-full h-full cursor-pointer"></div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        )}
        {project?.crews[index][lang].length > 0 && (
          <div className="mt-20 relative ">
            <div className="flex items-center w-fit  justify-center mx-auto  text-black font-semibold font-sans text-2xl">
              <div className="flex flex-col items-end  w-[500px] justify-end">
                {project.crews[index][lang].map((item, index) => {
                  return (
                    <p className="first-letter:uppercase " key={index}>
                      {item.name}
                    </p>
                  );
                })}
              </div>

              <div className="flex flex-col  items-center justify-start">
                {project.crews[index][lang].map((item, index) => {
                  return (
                    <div
                      className="first-letter:uppercase h-full mx-5 w-1 border-r-[1px] border-black"
                      key={index}
                    >
                      &nbsp;
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col  items-start w-[500px] justify-start">
                {project.crews[index][lang].map((item, index) => {
                  return (
                    <p className="first-letter:uppercase" key={index}>
                      {item.job}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {project?.review[index][lang] && (
          <div className="flex items-center justify-center w-full mx-auto p-7 mt-12 font-bold text-xl text-black text-center max-w-[990px]">
            {project.review[index][lang]}
          </div>
        )}
        {project?.images.length > 0 && (
          <div className="mt-12 flex flex-col items-center justify-center gap-5 w-full mx-auto">
            <p className="text-[110px] text-black font-semibold uppercase">
              Grading Still
            </p>
            <div className="h-[550px] w-10/12 ">
              <BeforeAfterSlider
                firstImage={{
                  imageUrl: `${
                    Image?.before ||
                    project?.images[0].before ||
                    "https://i.pinimg.com/474x/28/ec/9e/28ec9e3b921389282280ddcefce01849.jpg"
                  }`,
                }}
                secondImage={{
                  imageUrl: `${
                    Image?.after ||
                    project?.images[0].after ||
                    `${project?.images[0]}`
                  }`,
                }}
                className="h-full w-full"
              />
            </div>
            {project?.images.length > 1 && (
              <Slider
                {...settings}
                className="bg-black mb-32 w-10/12 text-black p-5 h-[300px]"
              >
                {project?.images.length > 1 &&
                  project?.images.map((img, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setImage(img), console.log("done click", index);
                        }}
                        className="w-[100px] hover:border-4 border-white  border-0 cursor-pointer px-2  h-[260px]"
                      >
                        <BeforeAfterSlider
                          firstImage={{
                            imageUrl: `${
                              img?.before ||
                              "https://i.pinimg.com/474x/28/ec/9e/28ec9e3b921389282280ddcefce01849.jpg"
                            }`,
                          }}
                          secondImage={{
                            imageUrl: `${img?.after || img}`,
                          }}
                          className="h-full w-full object-cover -z-10"
                        />
                      </div>
                    );
                  })}
              </Slider>
            )}
          </div>
        )}
        {project?.reviewBehindScenes ||
        project?.imagesBehindScenes.length > 0 ? (
          <div className="w-8/12 mx-auto h-fit mb-20">
            <p className="text-[110px] text-center text-black font-semibold uppercase">
              Behind scenes
            </p>
            <div className="bg-black rounded-lg  py-5 flex items-center justify-between">
              <div className="flex flex-wrap gap-3  text-white bg-black  w-3/5 items-center justify-center overflow-hidden">
                {project?.imagesBehindScenes.map((img, index) => (
                  <img
                    src={img}
                    className="w-[275px] object-cover rounded-md h-52"
                    key={index}
                    alt="image"
                  />
                ))}
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: project?.reviewBehindScenes[index][lang],
                }}
                className="text-white text-start items-center w-2/5 pl-2 pr-5"
              />
            </div>
          </div>
        ) : null}
        .
      </div>
      <div className="my-32 mx-auto max-w-[450px] flex items-center text-white justify-center flex-col gap-10">
        <p className="text-center tracking-wide">
          If you are looking for ways to advance your project, you can rely on
          my creativity and professionalism.
        </p>
        <button className="p-4 py-3 border-[1px] mx-auto  text-white text-sm  rounded-full border-white/30 uppercase">
          Schedule a call
        </button>
        <div className="flex items-center justify-center  gap-5">
          <Link
            href="https://www.instagram.com/younesfilm/"
            className="flex items-center justify-center rounded-full"
          >
            <img
              src="https://cdn.prod.website-files.com/65874245451824c5a44fcc6e/65db5ce8d1020a8f3a3b542a_instgram.webp"
              alt="icon"
              className="w-14 h-14"
            />
          </Link>
          <Link
            href="https://www.behance.net/younesfilm?tracking_source=hire"
            className="flex items-center justify-center rounded-full"
          >
            <img
              src="https://cdn.prod.website-files.com/65874245451824c5a44fcc6e/65db5ce89fbb21da5b2096f2_Behanse.webp"
              alt="icon"
              className="w-14 h-14"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/younesfilm/"
            className="flex items-center justify-center rounded-full"
          >
            <img
              src="https://cdn.prod.website-files.com/65874245451824c5a44fcc6e/65bade887c3f33a326765dd6_Linked_In.png"
              alt="icon"
              className="w-14 h-14"
            />
          </Link>
          <Link
            href="https://vimeo.com/younesfilm"
            className="flex items-center w-14 h-14 bg-white justify-center rounded-full"
          >
            <img
              src="https://cdn.prod.website-files.com/65874245451824c5a44fcc6e/65badf224cae75dec25b7cd1_vimeo.png"
              alt="icon"
              className="w-10  h-10"
            />
          </Link>
        </div>
      </div>
      <div className="w-full">
        <div className="w-11/12 mx-auto text-base py-10 border-t-[1px] border-white/30 text-white/70 flex items-center justify-between">
          <p className="uppercase tracking-wider">aLL COPYRIGHTS SAVED© 2024</p>
          <p className="tracking-wider uppercase">
            Created{" "}
            <Link href="https://www.noubodiez.com/">by NoubodieZ FZC LLC.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
