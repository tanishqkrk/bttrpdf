"use client";

import { Button } from "../ui/button";
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
    <header className="flex justify-between items-center p-3 px-8 border-b-2 fixed w-full">
      <div>
        <Link href="/">
          <img className="w-32" src="/logo_long.png" alt="" />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <a target="_blank" href="https://github.com/tanishqkrk/bttrpdf">
          <Button variant="outline">
            <Github />
          </Button>
        </a>
        <ModeToggle></ModeToggle>
        {userData ? (
          <Link href={"/dashboard"}>
            <Button
              onClick={() => {
                setLoading(true);
              }}
              variant="primary"
              className="bg-theme text-white z-[9999] p-6"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <p>Please wait</p>
                </>
              ) : (
                <div className="flex gap-3 items-center">
                  <img
                    className="w-8 rounded-full"
                    src={userData?.img}
                    alt=""
                  />
                  <p>Hey {userData?.name.split(" ")[0]}, Go to dashboard.</p>
                  <ChevronRight />
                </div>
              )}
            </Button>
          </Link>
        ) : (
          <div className="relative google p-1 rounded-lg">
            <Button
              onClick={async () => {
                setLoading(true);
                const response = await openAuthGoogle();
                const { isNewUser } = getAdditionalUserInfo(response);
                const { user } = response;

                if (response && isNewUser) {
                  await uploadToDB("users", user?.uid, {
                    id: user?.uid,
                    name: response?.user?.displayName,
                    email: user?.email,
                    img: user?.photoURL,
                    pdf_list: [],
                  });
                }
                setLoading(false);
              }}
              variant="secondary"
              className="z-[9999]  flex  gap-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <p>Please wait</p>
                </>
              ) : (
                <>
                  <img className="w-8" src="/icons/google.svg" alt="" />
                  <p>Register with Google</p>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
