"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ModeToggle } from "@/components/ThemeSwitcher";
import { Github, Google, Loader2 } from "lucide-react";
import Link from "next/link";
import useAuth from "../../context/AuthContext";
import useData from "@/context/DataContext";
import { getAdditionalUserInfo } from "firebase/auth";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Search } from "lucide-react";

export default function () {
  const { openAuthGoogle, user } = useAuth();
  const { uploadToDB, userData } = useData();

  const [loading, setLoading] = useState(false);
  console.log(userData);
  return (
    <header className="flex gap-8 justify-between items-center p-3 px-8 border-b-2 w-full">
      <div className="w-1/5">
        <Link href="/">
          <img className="w-32" src="/logo_long.png" alt="" />
        </Link>
      </div>
      <div className="w-3/5 relative">
        <Search
          color="rgba(0,0,0,0.3)"
          className=" absolute left-2 top-1/2 -translate-y-1/2"
        />
        <Input
          className="w-full pl-10 bg-secondary"
          type="text"
          placeholder="Search for your PDFs"
        />
      </div>
      <div className="w-1/5 flex items-center gap-3 justify-end">
        <ModeToggle></ModeToggle>
        <Link href="/" className="flex items-center justify-center gap-3">
          <div className="text-sm font-bold">{userData?.name}</div>
          <img className="w-12 rounded-full" src={userData?.img} alt="" />
        </Link>
      </div>
    </header>
  );
}
