"use client";
import List from "@/components/create/List";
import useData from "@/context/DataContext";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Trash2 } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import useMotion from "@/context/MotionContext";

export default function Page() {
  const { userData, uploadToDB } = useData();

  const { M } = useMotion();

  const [deleteAlert, setDeleteAlert] = useState(false);

  const [selectedPDF, setSelectedPDF] = useState(null);
  // console.log(selectedPDF);

  async function createPDF() {
    const new_pdf_id = crypto.randomUUID();

    const pdf_content_id = crypto.randomUUID();

    await uploadToDB("users", userData?.id, {
      ...userData,
      pdf_list: [
        ...userData?.pdf_list,
        {
          id: new_pdf_id,
          title: "New PDF",
          last_opened: Date.now(),
          created_on: Date.now(),
          content_id: pdf_content_id,
          PDF_config: {
            padding_x: 32,
            padding_y: 32,
            background_color: "#fff",
            text_color: "#000",
          },
        },
      ],
    });
    await uploadToDB("content", pdf_content_id, {
      pdf_id: new_pdf_id,
      id: pdf_content_id,
      content: [],
    });

    window.location.href = "/create/" + new_pdf_id;
  }

  return (
    <div>
      {deleteAlert && (
        <AnimatePresence>
          <M.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.5,
            }}
            exit={{
              opacity: 0,
            }}
            className="bg-black  top-0 left-0 fixed w-screen h-screen z-[9999]"
          ></M.div>
        </AnimatePresence>
      )}
      {deleteAlert && (
        <Alert
          className="flex flex-col gap-3 w-fit  fixed left-1/2 shadow-xl text-red-500 -translate-x-1/2 -translate-y-1/2 top-1/2 z-[999999] bg-secondary p-8  justify-center items-center"
          variant="destructive"
        >
          <div className="flex gap-3 justify-center items-center">
            <Trash2 color="red" className="h-4 w-4" />
            <AlertTitle>You're about to delete {selectedPDF?.title}</AlertTitle>
          </div>
          <div className="flex gap-3 justify-center w-full items-center">
            <Button
              onClick={async () => {
                await uploadToDB("users", userData?.id, {
                  ...userData,
                  pdf_list: userData?.pdf_list?.filter(
                    (x) => x.id !== selectedPDF?.id
                  ),
                });
                window.location.reload();
              }}
              variant="destructive"
            >
              Delete
            </Button>
            <Button onClick={() => setDeleteAlert(false)} variant="secondary">
              Cancel
            </Button>
          </div>
        </Alert>
      )}
      {userData?.pdf_list.length > 0 ? (
        <div className="pt-12">
          <div className="flex justify-end px-16 items-center text-center">
            <button
              onClick={async () => {
                await createPDF();
              }}
            >
              <Plus
                className="text-secondary bg-primary rounded-full p-3"
                size={48}
              />
            </button>
          </div>
          <div className="px-16 flex justify-center items-center w-full">
            <List
              setSelectedPDF={setSelectedPDF}
              setDeleteAlert={setDeleteAlert}
            ></List>
          </div>
        </div>
      ) : (
        <div className="h-full flex justify-center flex-col items-center bg-secondary py-12">
          <div className="p-8 ">
            You don't have any PDFs at this moment. Click on add to start a
            beautiful document!
          </div>
          <button
            onClick={async () => {
              await createPDF();
            }}
            className="flex w-20 justify-center items-center bg-secondary border-2 border-theme shadow-xl rounded-full aspect-square"
          >
            <Plus className="text-theme " size={32} />
          </button>
        </div>
      )}
    </div>
  );
}
