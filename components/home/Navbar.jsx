import { Button } from "../ui/button";
import { ModeToggle } from "@/components/ThemeSwitcher";
import { Github, Google } from "lucide-react";
import Link from "next/link";
export default function () {
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
        <div className="relative google p-1 rounded-lg">
          <Button variant="secondary" className="z-[9999]  flex  gap-3">
            <img className="w-8" src="/icons/google.svg" alt="" /> Register with
            Google
          </Button>
        </div>
      </div>
    </header>
  );
}
