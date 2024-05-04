"use client";

import { ModeToggle } from "@/components/ThemeSwitcher";
import { Input } from "@/components/ui/input";
import useData from "@/context/DataContext";
import { Plus, Table } from "lucide-react";
import { ListOrdered } from "lucide-react";
import { List } from "lucide-react";
import { Image } from "lucide-react";
import { Heading } from "lucide-react";
import { Type } from "lucide-react";
import { FileText } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import useMotion from "@/context/MotionContext";
import { AnimatePresence } from "framer-motion";
export default function Create({ params }) {
  const { userData, uploadToDB } = useData();
  const ID = params.pdf_id;

  const { M } = useMotion();

  const [baseData, setBaseData] = useState({});

  useMemo(() => {
    setBaseData(userData?.pdf_list?.filter((x) => x.id === ID)[0]);
  }, [userData]);

  async function updateData() {
    await uploadToDB("users", userData?.id, {
      ...userData,
      pdf_list: [...userData?.pdf_list?.filter((x) => x.id !== ID), baseData],
    });
  }

  const [addMenuOn, setAddMenuOn] = useState(false);

  const addButtonsStyle =
    " flex gap-3 w-full p-1   text-sm items-center dark:text-white text-black p-5 opacity-60 hover:opacity-100 transition-all duration-400";

  return (
    <div className="bg-secondary">
      <nav className="bg-secondary flex justify-between items-center p-3 px-8 border-b-2 w-full">
        <div className="flex gap-3 items-center justify-start">
          <a href="/dashboard">
            <FileText size={30} color="#3b40d5" />
          </a>
          <Input
            className="w-fit bg-secondary text-lg font-semibold"
            type="text"
            value={baseData?.title}
            onChange={(e) => {
              setBaseData((x) => {
                return {
                  ...x,
                  title: e.target.value,
                };
              });
            }}
          />
        </div>
        <div className="flex gap-3 items-center">
          <ModeToggle></ModeToggle>
          <button
            onClick={async () => {
              await updateData();
              alert("XONE");
            }}
            className="bg-theme px-5 py-2 rounded-lg font-semibold text-white"
          >
            Save
          </button>
        </div>
      </nav>

      <M.button
        onClick={() => setAddMenuOn((x) => !x)}
        initial={{
          scale: 1,
          rotate: 0,
        }}
        animate={{
          scale: addMenuOn ? 0.9 : 1,
          rotate: addMenuOn ? 45 : 0,
        }}
        className="bg-theme w-fit p-3 rounded-full fixed right-5 bottom-8 shadow-xl"
      >
        <Plus size={30} color="white"></Plus>
      </M.button>
      <AnimatePresence>
        {addMenuOn && (
          <M.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="element_toolbar flex flex-col  justify-start w-fit items-center  font-semibold bg-secondary fixed right-5 shadow-xl bottom-24 rounded-lg divide-y-2 border-2"
          >
            <button className={addButtonsStyle}>
              <Heading className="" size={15} />
              <p>Heading</p>
            </button>
            <button className={addButtonsStyle}>
              <Type size={15} />
              <p>Text</p>
            </button>
            <button className={addButtonsStyle}>
              <Image size={15} />
              <p>Image</p>
            </button>
            <button className={addButtonsStyle}>
              <Table size={15} />
              <p>Table</p>
            </button>
            <button className={addButtonsStyle}>
              <List size={15} />
              <p>U. List</p>
            </button>
            <button className={addButtonsStyle}>
              <ListOrdered size={15} />
              <p>O. List</p>
            </button>
          </M.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center p-12">
        <div className="h-[1163px] w-[794px] bg-white dark:bg-zinc-800 border-2 "></div>
      </div>
    </div>
  );
}
