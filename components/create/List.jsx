"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useData from "@/context/DataContext";
import { FileText, PenLine } from "lucide-react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Download } from "lucide-react";
import useMotion from "@/context/MotionContext";

export default function List() {
  const { userData, uploadToDB } = useData();
  const { M } = useMotion();

  return (
    <Table className="">
      <TableCaption>Your PDFs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Last opened</TableHead>
          <TableHead>Size</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData?.pdf_list
          ?.sort((a, b) => b.last_opened - a.last_opened)
          ?.map((pdf) => {
            return (
              <TableRow className="cursor-pointer select-none ">
                <TableCell
                  onClick={async () => {
                    await uploadToDB("users", userData?.id, {
                      ...userData,
                      pdf_list: [
                        ...userData?.pdf_list?.filter((x) => x.id !== pdf.id),
                        {
                          ...pdf,
                          last_opened: Date.now(),
                        },
                      ],
                    });
                    window.location.href = "/create/" + pdf.id;
                  }}
                  className="font-medium flex gap-3 items-center justify-start"
                >
                  <FileText size={22} color="#3b40d5" /> <p>{pdf.title}</p>
                </TableCell>
                <TableCell>{new Date(pdf.last_opened).toString()}</TableCell>
                <TableCell>6.4B</TableCell>
                <TableCell className="flex gap-3 items-center py-0 justify-end">
                  <Button
                    onClick={() => {
                      window.location.href = "/create/" + pdf.id;
                    }}
                    className="bg-theme"
                    variant="primary"
                  >
                    <PenLine color="white" size={14} />
                  </Button>
                  <Button className="" variant="destructive">
                    <Trash2 size={14} />
                  </Button>
                  <Button className="" variant="secondary">
                    <Download size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
