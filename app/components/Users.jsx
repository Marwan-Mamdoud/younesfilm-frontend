import { getUsers } from "@/lib/api";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import User from "./User";
import { deleteUser, updateUser, uploadImageToCloudinary } from "@/lib/api";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [openDialop, setOpenDialog] = useState(false);
  const [Index, setindex] = useState();
  const [image, setImage] = useState();
  const [Name, setName] = useState();
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.5, // Compress to a max of 1MB per image
      maxWidthOrHeight: 1024, // Resize to a max width or height
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };
  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);
  return (
    <div className="w-fit h-fit">
      {users?.map(({ name, thumbnail, _id }, index) => (
        // <User
        //   key={index}
        //   num={index}
        //   name={user.name}
        //   id={user._id}
        //   thumbnail={user.thumbnail}
        // />
        <div key={_id}>
          <div
            // key={_id}
            onClick={() => {
              setOpenDialog(false);
              console.log("done close dailog");
            }}
            className={`${
              openDialop ? "" : "hidden"
            } top-0 right-0 w-[100dvw] z-50  fixed flex items-center justify-center h-[100dvh] mx-10 backdrop-blur-md  text-black`}
          >
            <div className="w-[600px]  h-fit flex items-center justify-center flex-col rounded-2xl p-5 py-20 bg-white">
              <p className="text-3xl cursor-default font-bold  text-center tracking-wide">
                -Are you sure you want to delete user<br></br>
                <span className="mt-2 text-stone-600">-- {name} --</span> ?!
              </p>
              <div className="flex items-center text-white font-bold text-2xl tracking-wide mt-12 justify-center gap-20">
                <button className="px-10 py-4 bg-green-400 rounded-2xl">
                  No, Close
                </button>
                <button
                  onClick={() => deleteUser(id)}
                  className="px-10 py-4 bg-red-400 rounded-2xl"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
          <div
            key={_id}
            className="flex pl-10 pt-10 flex-col items-center justify-center gap-10"
          >
            <div className="w-[600px] flex items-center justify-between">
              <form
                className={`flex items-center justify-center gap-5 ${
                  index == Index ? "" : "hidden"
                } `}
              >
                <label
                  htmlFor="img"
                  className="border-2 cursor-pointer border-dashed w-32 h-32"
                >
                  <img
                    src={image || thumbnail}
                    alt="image1"
                    className="w-full h-full object-cover"
                  />
                </label>
                <input
                  type="file"
                  name="img"
                  id="img"
                  onChange={async (e) => {
                    if (!e.target.files[0].type.startsWith("image/")) {
                      toast.warn("Please upload only image files.");
                      e.target.value = null;
                      setImage(null);
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
                      setImage(result);
                      console.log(result, "image after reader");

                      // This will be a base64 string
                    };
                  }}
                  className="w-full rounded-md hidden bg-white text-black px-5 h-10 outline-none"
                />
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={name}
                  className="w-[200px] text-black h-[50px] outline-none rounded-lg pl-5"
                />
              </form>
              <div
                className={`flex items-center justify-center gap-5 ${
                  index === Index ? "hidden" : ""
                }`}
              >
                <img
                  src={thumbnail}
                  alt="img"
                  className="w-28 h-28
                object-cover rounded-2xl"
                />
                <p className="text-white font-bold text-3xl">{name}</p>
              </div>
              <div className=" flex items-center cursor-pointer justify-center gap-5">
                {index != Index ? (
                  <div
                    onClick={() => {
                      setindex(index);
                    }}
                    className="w-fit h-fit"
                  >
                    <img
                      src="https://cdn.prod.website-files.com/66eaae371a3339a1873d1c70/66f2caebf0f6165c1abbe4b2_pencil-white.png"
                      alt="Edit"
                      className="w-6 h-6"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      console.log({
                        id: _id,
                        date: { name: Name, thumbnail: image },
                      });
                      updateUser({
                        id: _id,
                        data: { name: Name, thumbnail: image },
                      });
                      setindex(null);
                    }}
                    className="bg-white py-4 px-10 rounded-lg text-black"
                  >
                    Save
                  </button>
                )}
                <img
                  onClick={() => setOpenDialog(true)}
                  src="https://cdn.prod.website-files.com/66eaae371a3339a1873d1c70/66f2cae281b321c33c489471_bin-white.png"
                  alt="delete"
                  className="w-6   h-6 "
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
