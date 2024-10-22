import { getProject } from "@/lib/api";
import React from "react";

const Page = async ({ params }) => {
  const { idProject } = params;
  const project = await getProject(idProject);
  let date = project.date;
  date = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="mx-auto w-fit">
      <p className="text-5xl font-bold tracking-wider text-black text-center mx-auto py-5">
        {project.name}
      </p>
      <p className="bg-slate-400 py-5 text-center">{date}</p>
      <img
        src={`${project.thumbnail}`}
        className="w-full h-[400px] object-cover"
        alt="image"
      />
      <div className="flex flex-wrap gap-5 p-10">
        {project.videos.map((video, index) => {
          return (
            <iframe key={index} src={`${video}`} width={700} height={400} />
          );
        })}
      </div>
      <div className="">
        {project.crews.map((item, index) => {
          return (
            <p
              key={index}
              className="bg-slate-400 flex gap-5 items-center justify-center"
            >
              <span className="font-bold">{item.name}</span>
              <span className="">{item.job}</span>
            </p>
          );
        })}
        <p className="py-10 bg-zinc-700 font-bold text-white font-4xl text-center uppercase tracking-wider">
          {project.review}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 p-10">
          {project.images.map((img, index) => {
            return (
              <img
                key={index}
                alt="image"
                src={`${img}`}
                className="w-[200px] h-[200px] object-cover"
              />
            );
          })}
        </div>
        <div className="flex items-center justify-center mx-auto gap-10">
          <div className="w-[250px] flex flex-wrap gap-5 p-5">
            {project.imagesBehindScenes.map((img, index) => {
              return (
                <img
                  key={index}
                  alt="image"
                  src={`${img}`}
                  className="w-[90px] h-[90px] object-cover"
                />
              );
            })}
          </div>
          <p className="bg-black text-white font-bold tracking-wider text-3xl">
            {project.reviewBehindScenes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
