import { getCategories } from "@/lib/api";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState();
  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  });
  return (
    <div className="grid grid-cols-2 gap-16 mt-20 items-start justify-start">
      {categories?.length > 0
        ? categories?.map((item) => (
            <div
              key={item.name}
              className="flex justify-center items-center gap-12"
            >
              <div className="w-[350px] h-[45px] bg-white flex items-start rounded-md cursor-not-allowed">
                <p className=" text-black px-3 pt-2">{item.name}</p>
              </div>
              <div className="flex items-center justify-center gap-5">
                <img
                  src="https://cdn.prod.website-files.com/66eaae371a3339a1873d1c70/66f2caebf0f6165c1abbe4b2_pencil-white.png"
                  alt="edit"
                  className="h-5  cursor-pointer w-5"
                />
                <img
                  src="https://cdn.prod.website-files.com/66eaae371a3339a1873d1c70/66f2cae281b321c33c489471_bin-white.png"
                  alt="delete"
                  className="h-5 cursor-pointer w-5"
                />
              </div>
            </div>
          ))
        : "No Cateogries"}
    </div>
  );
};

export default Categories;
