"use client";

import Link from "next/link";
import useAuth from "@/context/AuthContext";
// bg-transparent border-2 border-primary text-primary  p-3  rounded-lg duration-300 transition-all hover:shadow-xl  hover:scale-105 px-6 font-semibold flex gap-3
export default function Navbar() {
  const { openAuthGoogle, user } = useAuth();

  console.log(user);

  return (
    <div className="w-4/6 fixed left-1/2 -translate-x-1/2 top-4  rounded-3xl p-6 shadow-xl border-2 border-primary  flex justify-between bg-base shadow-[#ffffff0f]">
      <Link href={"/"} className="flex items-center gap-1 text-xl">
        <img src="/logo.svg" alt="" />
        <span className="text-primary">BTTRPDF</span>
      </Link>
      <div>
        <button
          onClick={() => {
            openAuthGoogle();
          }}
          className="cta flex gap-3 items-center"
        >
          Register with <img className="w-6" src="/google.png" alt="" />
        </button>
      </div>
      {/* <div>
        <a target="blank" href="https://github.com/tanishqkrk/cvista">
          <img src="/github.svg" alt="" />
        </a>
      </div> */}
    </div>
  );
}
