"use client";
import { delelteCategory, getCategories, updateCategory } from "@/lib/api";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState();
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);
  const editCategory = async (e) => {
    e.preventDefault();
    setEdit(false);
    setLoading(true);
    console.log("updating");

    await updateCategory({ id, name });
    console.log("done Update");
    setLoading(false);
  };
  return (
    <div className="grid grid-cols-2 gap-8 mt-20 items-start justify-start">
      {categories?.length > 0
        ? categories?.map((item, index) => (
            <form onSubmit={editCategory} key={item.name}>
              <div className="flex justify-center items-center gap-12 mr-10">
                <input
                  defaultValue={item.name}
                  disabled={!edit}
                  onChange={(e) => {
                    setName(e.target.value);
                    setId(item._id);
                  }}
                  required
                  className={`w-[350px] h-[45px] bg-white px-5 text-black flex items-start rounded-md ${
                    edit == index ? "" : "cursor-not-allowed"
                  }`}
                ></input>
                <div className="flex items-center justify-center gap-5">
                  <img
                    src="https://cdn.prod.website-files.com/66eaae371a3339a1873d1c70/66f2caebf0f6165c1abbe4b2_pencil-white.png"
                    alt="edit"
                    onClick={() => setEdit(index)}
                    className={`h-5 cursor-pointer w-5  ${
                      edit === index ? "hidden" : " "
                    }`}
                  />
                  <button
                    onClick={() => {
                      setId(item._id);
                      console.log(item._id, name);
                    }}
                    type="submit"
                    className={`py-2 px-5 bg-white rounded-lg  text-black ${
                      edit === index ? " " : "hidden"
                    }`}
                  >
                    Save
                  </button>
                  <img
                    src="https://cdn.prod.website-files.com/66eaae371a3339a1873d1c70/66f2cae281b321c33c489471_bin-white.png"
                    alt="delete"
                    onClick={async () => {
                      setLoading(true);
                      await delelteCategory({ id: item._id });
                      categories.filter((i) => i._id === item_id);
                      setLoading(false);
                    }}
                    className="h-5 cursor-pointer w-5"
                  />
                </div>
              </div>
            </form>
          ))
        : "No Cateogries"}
      <div
        className={`${
          loading ? "" : "hidden"
        }  w-full h-[100dvh] absolute top-0 right-0 backdrop-blur-sm `}
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
  );
};

export default Categories;
