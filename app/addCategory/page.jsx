"use client";
import { addCategory } from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onsubmit = async (e) => {
    let name = document.querySelectorAll(".cat");
    name = Array.from(name).map((item) => item.value);
    e.preventDefault();
    setLoading(true);
    await addCategory(name);
    setLoading(false);
    router.push("/");
  };
  return (
    <>
      <div className="mx-auto w-[1250px] pt-36">
        <label htmlFor="input" className="block mb-2">
          Add new work Type<span className="text-red-600 text-xl"> *</span>
        </label>
        <form onSubmit={onsubmit}>
          <input
            type="text"
            name="input"
            required
            className=" outline-none cat  rounded-md px-5 h-12 text-black/60 w-10/12"
            placeholder="Enter new work type EN"
          />
          <input
            type="text"
            name="input"
            required
            className=" outline-none cat my-5 rounded-md px-5 h-12 text-black/60 w-10/12"
            placeholder="Enter new work type CZ"
          />
          <input
            type="text"
            name="input"
            required
            className=" outline-none cat rounded-md px-5 h-12 text-black/60 w-10/12"
            placeholder="Enter new work type AR"
          />
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
          }  w-full h-[100dvh] fixed z-50 bottom-0 right-0 backdrop-blur-sm `}
        >
          <div
            className={` bg-white w-[500px]  top-1/2 -translate-x-1/2 z-20 -right-1/2 -translate-y-1/2 text-black h-[300px] relative   flex flex-col items-center justify-center gap-5  rounded-lg`}
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
    </>
  );
};

export default Page;
