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

export default function () {
  const { openAuthGoogle, user } = useAuth();
  const { uploadToDB, userData } = useData();

  const [loading, setLoading] = useState(false);
  console.log(userData);
  return (
    <header className="flex gap-8 justify-between items-center p-3 px-8 border-b-2 fixed w-full">
      <div className="w-1/5">
        <Link href="/">
          <img className="w-32" src="/logo_long.png" alt="" />
        </Link>
      </div>
      <div className="w-3/5">
        <Input
          className="w-full"
          type="Search for your PDFs"
          placeholder="text"
        />
      </div>
      <div className="w-1/5 flex items-center gap-3">
        <ModeToggle></ModeToggle>
        <Link href="/" className="flex items-center justify-center gap-3">
          <div className="text-sm font-bold">{userData?.name}</div>
          <img className="w-12 rounded-full" src={userData?.img} alt="" />
        </Link>
      </div>
    </header>
  );
}
