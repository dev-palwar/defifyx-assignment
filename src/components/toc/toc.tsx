import React, { useEffect, useState } from "react";
import poster from "../../assets/nen.jpg";
import type { TocProps } from "../../types";
import { Typography } from "../ui/typography";
import TocRenderer from "./toc-renderer";
import TocList from "./toc-list";

const Toc: React.FC<TocProps> = ({ data, isCollapsible, activeColor }) => {
  const [highlightedId, setHighlightedId] = useState<string>();
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});
  const [showTocList, setShowTocList] = useState(false);
  const [userHoveredOnce, setUserHoveredOnce] = useState(false);
  const [forceHide, setForceHide] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setHighlightedId(window.location.hash.split("#")[1]);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = scrollY > window.innerHeight * 0.9;
      if (shouldShow && !userHoveredOnce) {
        setShowTocList(true);
      } else if (!shouldShow) {
        setShowTocList(false);
        setUserHoveredOnce(false);
        setForceHide(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [userHoveredOnce]);

  return (
    <div className="m-auto container main-container p-4 flex flex-col gap-8">
      {/* Hero section starts */}
      <div className="hero-section min-h-[95vh] flex flex-col lg:flex-row justify-end items-center px-4 lg:px-20 relative gap-4 lg:gap-0">
        {/* Title */}
        <Typography
          variant="h1"
          className="font-italiana mb-6 lg:mb-0 text-center lg:text-left lg:-rotate-90 lg:absolute lg:bottom-32 lg:left-0 text-2xl lg:text-4xl"
        >
          Table of Contents
        </Typography>

        {/* TocList container */}
        <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
          <div className="transition-all duration-500 ease-in-out w-full max-w-md">
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
        </div>

        {/* Poster Image */}
        <div className="w-full lg:w-[50%]">
          <img
            src={poster}
            alt="poster"
            className="w-full h-auto object-contain max-h-[70vh] rounded-lg"
          />
        </div>
      </div>

      {/* Content viewer section */}
      <div className="content-viewer-section relative">
        {/* Floating and Sticky Toc */}
        {showTocList && !forceHide && (
          <div
            className={`fixed top-16 right-12 z-10 w-[300px] p-4 bg-accent rounded-3xl shadow-xl border border-yellow-400 transition-all duration-300 scale-95 hover:scale-100 
      translate-y-2 hover:translate-y-0 ease-in-out hidden sm:block ${
        !userHoveredOnce ? "animate-pulse" : ""
      }`}
            onMouseEnter={() => {
              setUserHoveredOnce(true);
              setForceHide(false);
            }}
            onMouseLeave={() => {
              setForceHide(true);
            }}
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
        )}

        {/* When user has hovered once, this allows hover trigger again */}
        {userHoveredOnce && forceHide && (
          <div
            className="fixed top-16 right-12 z-10 w-[300px] h-[400px] rounded-3xl hidden sm:block"
            onMouseEnter={() => {
              setForceHide(false);
            }}
          ></div>
        )}

        <TocRenderer data={data} />
      </div>
    </div>
  );
};

export default Toc;
