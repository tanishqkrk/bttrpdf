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
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Baseline } from "lucide-react";

export default function Create({ params }) {
  const { userData, uploadToDB } = useData();
  const ID = params.pdf_id;

  const { M } = useMotion();

  const [baseData, setBaseData] = useState({});

  const [content, setContent] = useState({});

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

  useEffect(() => {
    async function fetchContent() {
      const docRef = doc(db, "content", baseData?.content_id);
      const docSnap = await getDoc(docRef);
      setContent(docSnap.data());
    }
    fetchContent();
  }, [userData]);

  function addElement(type) {
    if (type === "heading") {
      const new_heading = {
        type: "heading",
        id: crypto.randomUUID(),
        heading: "Heading",
        timestamp: Date.now(),
        size: 1,
        fontColor: "#000",
        backgroundColor: "#fff",
      };
      setContent((prev) => {
        return {
          ...prev,
          content: [...prev?.content, new_heading],
        };
      });

      setSelectedElement(new_heading);
    }
  }

  const [selectedElement, setSelectedElement] = useState({});

  const colorArray = {
    red: [
      "#FF0000", // Red
      "#FF3333",
      "#FF6666",
      "#FF9999",
      "#FFCCCC",
      "#FF3333",
      "#FF6666",
      "#FF9999",
      "#FFCCCC",
      "#FF0000", // Red
    ],
    green: [
      "#00FF00", // Green
      "#33FF33",
      "#66FF66",
      "#99FF99",
      "#CCFFCC",
      "#33FF33",
      "#66FF66",
      "#99FF99",
      "#CCFFCC",
      "#00FF00", // Green
    ],
    blue: [
      "#0000FF", // Blue
      "#3333FF",
      "#6666FF",
      "#9999FF",
      "#CCCCFF",
      "#3333FF",
      "#6666FF",
      "#9999FF",
      "#CCCCFF",
      "#0000FF", // Blue
    ],
    blackToWhite: [
      "#000000", // Black
      "#333333",
      "#666666",
      "#999999",
      "#CCCCCC",
      "#FFFFFF", // White
      "#CCCCCC",
      "#999999",
      "#666666",
      "#333333",
      "#000000", // Black
    ],
    yellow: [
      "#FFFF00", // Yellow
      "#FFFF33",
      "#FFFF66",
      "#FFFF99",
      "#FFFFCC",
      "#FFFF33",
      "#FFFF66",
      "#FFFF99",
      "#FFFFCC",
      "#FFFF00", // Yellow
    ],
    brown: [
      "#8B4513", // Brown
      "#A0522D",
      "#CD853F",
      "#D2691E",
      "#8B4513",
      "#A0522D",
      "#CD853F",
      "#D2691E",
      "#8B4513",
      "#A0522D", // Brown
    ],
  };

  // Combine all arrays into one
  const colors = [
    ...colorArray.red,
    ...colorArray.green,
    ...colorArray.blue,
    ...colorArray.blackToWhite,
    ...colorArray.yellow,
    ...colorArray.brown,
  ];

  // console.log(...content?.content);

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
      <div className="toolbar p-2 px-12 bg-white dark:bg-black">
        {selectedElement?.type === "heading" ? (
          <div className="flex items-center gap-6">
            <div>
              <Select
                className=""
                defaultValue={content?.content
                  ?.filter((x) => x.id === selectedElement.id)[0]
                  ?.size.toString()}
                onValueChange={(e) => {
                  setContent((prev) => {
                    return {
                      ...prev,
                      content: [
                        ...prev?.content?.filter(
                          (x) =>
                            x.id !==
                            content?.content?.filter(
                              (x) => x.id === selectedElement.id
                            )[0].id
                        ),
                        {
                          ...content?.content?.filter(
                            (x) => x.id === selectedElement.id
                          )[0],
                          size: parseInt(e),
                        },
                      ],
                    };
                  });
                }}
              >
                <SelectTrigger className="w-16">
                  <SelectValue placeholder="H" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">H1</SelectItem>
                  <SelectItem value="2">H2</SelectItem>
                  <SelectItem value="3">H3</SelectItem>
                  <SelectItem value="4">H4</SelectItem>
                  <SelectItem value="5">H5</SelectItem>
                  <SelectItem value="6">H6</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline">
                    <Baseline
                      color={
                        content?.content?.filter(
                          (x) => x.id === selectedElement.id
                        )[0].fontColor
                      }
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Text color</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-8 gap-2">
                    {colors?.map((color) => {
                      return (
                        <DropdownMenuItem
                          onClick={() => {
                            setContent((prev) => {
                              return {
                                ...prev,
                                content: [
                                  ...prev?.content?.filter(
                                    (x) =>
                                      x.id !==
                                      content?.content?.filter(
                                        (x) => x.id === selectedElement.id
                                      )[0].id
                                  ),
                                  {
                                    ...content?.content?.filter(
                                      (x) => x.id === selectedElement.id
                                    )[0],
                                    fontColor: color,
                                  },
                                ],
                              };
                            });
                          }}
                          className="p-0"
                        >
                          <div
                            style={{
                              background: color,
                            }}
                            className="w-5 h-5  rounded-full"
                          ></div>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : selectedElement?.type === "text" ? (
          <></>
        ) : selectedElement?.type === "image" ? (
          <></>
        ) : selectedElement?.type === "table" ? (
          <></>
        ) : selectedElement?.type === "ulist" ? (
          <></>
        ) : selectedElement?.type === "olist" ? (
          <></>
        ) : (
          <div></div>
        )}
      </div>
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
            <button
              onClick={() => {
                addElement("heading");
                setAddMenuOn(false);
              }}
              className={addButtonsStyle}
            >
              <Heading className="" size={15} />
              <p>Heading</p>
            </button>

            <button
              onClick={() => {
                addElement("text");
              }}
              className={addButtonsStyle}
            >
              <Type size={15} />
              <p>Text</p>
            </button>

            <button
              onClick={() => {
                addElement("image");
              }}
              className={addButtonsStyle}
            >
              <Image size={15} />
              <p>Image</p>
            </button>

            <button
              onClick={() => {
                addElement("table");
              }}
              className={addButtonsStyle}
            >
              <Table size={15} />
              <p>Table</p>
            </button>
            <button
              onClick={() => {
                addElement("ulist");
              }}
              className={addButtonsStyle}
            >
              <List size={15} />
              <p>U. List</p>
            </button>
            <button
              onClick={() => {
                addElement("olist");
              }}
              className={addButtonsStyle}
            >
              <ListOrdered size={15} />
              <p>O. List</p>
            </button>
          </M.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center p-12">
        {content?.content ? (
          <div
            style={{
              padding: `${baseData?.PDF_config?.padding_x}px ${baseData?.PDF_config?.padding_y}px `,
              background: baseData?.PDF_config?.background_color,
              color: baseData?.PDF_config?.text_color,
              fontFamily: "Times New Roman, Times, serif",
            }}
            className="h-[1163px] w-[794px]  border-2 "
          >
            {content?.content?.map((element) => {
              if (element?.type === "heading") {
                if (element?.size === 1) {
                  return (
                    <h1
                      onClick={() => {
                        setSelectedElement(element);
                      }}
                    >
                      <input
                        style={{
                          fontSize: "34" + "px",
                          fontWeight: 700,
                          textAlign: "center",
                          color: element?.fontColor,
                        }}
                        type="text"
                        className="w-full focus-within:outline-none"
                        value={element?.heading}
                        onChange={(e) => {
                          setContent((prev) => {
                            return {
                              ...prev,
                              content: [
                                ...prev?.content?.filter(
                                  (x) => x.id !== element.id
                                ),
                                {
                                  ...element,
                                  heading: e.target.value,
                                },
                              ],
                            };
                          });
                        }}
                      />
                    </h1>
                  );
                } else if (element?.size === 2) {
                  return (
                    <h3
                      onClick={() => {
                        setSelectedElement(element);
                      }}
                    >
                      <input
                        style={{
                          fontSize: "30" + "px",
                          fontWeight: 700,
                          textAlign: "center",
                          color: element?.fontColor,
                        }}
                        type="text"
                        className="w-full focus-within:outline-none"
                        value={element?.heading}
                        onChange={(e) => {
                          setContent((prev) => {
                            return {
                              ...prev,
                              content: [
                                ...prev?.content?.filter(
                                  (x) => x.id !== element.id
                                ),
                                {
                                  ...element,
                                  heading: e.target.value,
                                },
                              ],
                            };
                          });
                        }}
                      />
                    </h3>
                  );
                } else if (element?.size === 3) {
                  return (
                    <h3
                      onClick={() => {
                        setSelectedElement(element);
                      }}
                    >
                      <input
                        style={{
                          fontSize: "24" + "px",
                          fontWeight: 700,
                          textAlign: "center",
                          color: element?.fontColor,
                        }}
                        type="text"
                        className="w-full focus-within:outline-none"
                        value={element?.heading}
                        onChange={(e) => {
                          setContent((prev) => {
                            return {
                              ...prev,
                              content: [
                                ...prev?.content?.filter(
                                  (x) => x.id !== element.id
                                ),
                                {
                                  ...element,
                                  heading: e.target.value,
                                },
                              ],
                            };
                          });
                        }}
                      />
                    </h3>
                  );
                } else if (element?.size === 4) {
                  return (
                    <h3
                      onClick={() => {
                        setSelectedElement(element);
                      }}
                    >
                      <input
                        style={{
                          fontSize: "20" + "px",
                          fontWeight: 700,
                          textAlign: "center",
                          color: element?.fontColor,
                        }}
                        type="text"
                        className="w-full focus-within:outline-none"
                        value={element?.heading}
                        onChange={(e) => {
                          setContent((prev) => {
                            return {
                              ...prev,
                              content: [
                                ...prev?.content?.filter(
                                  (x) => x.id !== element.id
                                ),
                                {
                                  ...element,
                                  heading: e.target.value,
                                },
                              ],
                            };
                          });
                        }}
                      />
                    </h3>
                  );
                } else if (element?.size === 5) {
                  return (
                    <h5
                      onClick={() => {
                        setSelectedElement(element);
                      }}
                    >
                      <input
                        style={{
                          fontSize: "18" + "px",
                          fontWeight: 700,
                          textAlign: "center",
                          color: element?.fontColor,
                        }}
                        type="text"
                        className="w-full focus-within:outline-none"
                        value={element?.heading}
                        onChange={(e) => {
                          setContent((prev) => {
                            return {
                              ...prev,
                              content: [
                                ...prev?.content?.filter(
                                  (x) => x.id !== element.id
                                ),
                                {
                                  ...element,
                                  heading: e.target.value,
                                },
                              ],
                            };
                          });
                        }}
                      />
                    </h5>
                  );
                } else if (element?.size === 6) {
                  return (
                    <h6
                      onClick={() => {
                        setSelectedElement(element);
                      }}
                    >
                      <input
                        style={{
                          fontSize: "16" + "px",
                          fontWeight: 700,
                          textAlign: "center",
                          color: element?.fontColor,
                        }}
                        type="text"
                        className="w-full focus-within:outline-none"
                        value={element?.heading}
                        onChange={(e) => {
                          setContent((prev) => {
                            return {
                              ...prev,
                              content: [
                                ...prev?.content?.filter(
                                  (x) => x.id !== element.id
                                ),
                                {
                                  ...element,
                                  heading: e.target.value,
                                },
                              ],
                            };
                          });
                        }}
                      />
                    </h6>
                  );
                }
              }
            })}
          </div>
        ) : (
          <div
            style={{
              padding: "32px",
              background: "white",
              color: "black",
            }}
            className="h-[1163px] w-[794px] bg-white dark:bg-zinc-800 border-2 flex justify-center items-start text-center "
          >
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}
