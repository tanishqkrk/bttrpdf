import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex items-center px-12">
      <div className="flex flex-col justify-center items-start gap-6 h-screen   font-bold  text-left w-1/2">
        <div className="flex text-6xl flex-wrap gap-4 justify-start">
          Build beautiful PDFs <span className="text-theme ">blazingly</span>{" "}
          fast
        </div>
        <div className="w-2/3  font-normal">
          Generate PDFs by editing your data in real-time, no conversion, no
          jitter.
        </div>
        <div className="flex gap-3">
          <Button className="bg-theme text-white font-bold text-lg p-6">
            Try it out
          </Button>
          <Button className=" text-lg p-6" variant="outline">
            Know more
          </Button>
        </div>
        <div className="text-sm">
          * Making an account with Google is required to use Bttrpdf.
        </div>
      </div>
      <div className="w-1/2">
        <img className="rounded-xl shadow-xl " src="/hero.png" alt="" />
      </div>
    </section>
  );
}
