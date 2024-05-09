"use client";
import List from "@/components/create/List";
import useData from "@/context/DataContext";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const { userData, uploadToDB } = useData();

  return (
    <div>
      {userData?.pdf_list.length > 0 ? (
        <div className="pt-12">
          <div className="flex justify-end px-16 items-center text-center">
            <button
              onClick={async () => {
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
              }}
            >
              <Plus
                className="text-secondary bg-primary rounded-full p-3"
                size={48}
              />
            </button>
          </div>
          <div className="px-16 flex justify-center items-center w-full">
            <List></List>
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
              const new_pdf_id = crypto.randomUUID();

              const pdf_content_id = crypto.randomUUID();

              await uploadToDB("users", userData?.id, {
                ...userData,
                pdf_list: [
                  {
                    id: new_pdf_id,
                    title: "New PDF",
                    last_opened: Date.now(),
                    created_on: Date.now(),
                    content_id: pdf_content_id,
                  },
                ],
              });
              await uploadToDB("content", pdf_content_id, {
                pdf_id: new_pdf_id,
                id: pdf_content_id,
                content: [],
              });

              window.location.href = "/create/" + new_pdf_id;
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
