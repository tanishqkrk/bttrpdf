"use client";

import Link from "next/link";
import CTAButton from "../UI/CTAButton";

export default function Navbar() {
  return (
    <div className="w-4/6 fixed left-1/2 -translate-x-1/2 top-4  rounded-3xl p-6 shadow-xl border-2 border-primary  flex justify-between bg-base shadow-[#ffffff0f]">
      <Link href={"/"} className="flex items-center gap-1 text-xl">
        <img src="/logo.svg" alt="" />
        <span className="text-primary">BTTRPDF</span>
      </Link>
      <div>
        <button
          onClick={() => {
            method();
          }}
          className="bg-transparent border-2 border-primary text-primary  p-3  rounded-lg duration-300 transition-all hover:shadow-xl  hover:scale-105 px-6 font-semibold flex gap-3"
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
