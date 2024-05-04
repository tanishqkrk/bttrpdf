"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { motion as M } from "framer-motion";
import { useInView } from "framer-motion";

const MotionContext = createContext();

function MotionProvider({ children }) {
  const transition = {
    duration: 0.8,
    ease: "easeOut",
  };

  const inView = (ref) => useInView(ref, { once: false });
  if (MotionContext)
    return (
      <MotionContext.Provider value={{ transition, M, inView }}>
        {children}
      </MotionContext.Provider>
    );
}

export default function useMotion() {
  return useContext(MotionContext);
}
export { MotionProvider, useMotion };
