import React, { useEffect, useState } from "react";
import shanks from "../../assets/shanks.jpg";
import TocList from "./toc-list";
import type { TocProps } from "../../types";
import { Typography } from "../ui/typography";
import TocRenderer from "./toc-renderer";

const Toc: React.FC<TocProps> = ({ data, isCollapsible, activeColor }) => {
  const [highlightedId, setHighlightedId] = useState<string>();
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleHashChange = () => {
      setHighlightedId(window.location.hash.split("#")[1]);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="main-container p-4 flex flex-col gap-8">
      <div className="hero-section h-[95vh] flex justify-evenly relative">
        <Typography
          variant="h1"
          className="font-italiana mb-4 -rotate-90 absolute bottom-32 left-0"
        >
          Table of Contents
        </Typography>

        <div className="flex justify-end gap-28">
          <div className="self-center transition-all duration-500 ease-in-out">
            <TocList
              items={data}
              prefix=""
              highlightedId={highlightedId}
              expandedMap={expandedMap}
              setExpandedMap={setExpandedMap}
              isCollapsible={isCollapsible}
              activeColor={activeColor}
            />
          </div>

          <div className="poster h-full">
            <img src={shanks} alt="poster" className="h-full object-fill" />
          </div>
        </div>
      </div>

      <div className="content-viewer-section relative flex flex-col">
        <div
          className="sticky w-[50%] self-end bg-accent top-12 right-12 border rounded-3xl shadow-xl
          opacity-0 hover:opacity-100 scale-95 hover:scale-100 
          translate-y-2 hover:translate-y-0 transition-all duration-300 ease-in-out p-3"
        >
          <TocList
            items={data}
            prefix=""
            highlightedId={highlightedId}
            expandedMap={expandedMap}
            setExpandedMap={setExpandedMap}
            isCollapsible={isCollapsible}
            activeColor={activeColor}
          />
        </div>

        <TocRenderer data={data} />
      </div>
    </div>
  );
};

export default Toc;
