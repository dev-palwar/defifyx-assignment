import React, { useEffect, useState } from "react";
import { Typography } from "./ui/typography";
import tocdata from "../data/slug.json";

interface TocItem {
  title: string;
  level: "h1" | "h2" | "h3" | "h4";
  content: string;
  children?: TocItem[];
}

const Toc: React.FC = () => {
  const [highlightedId, setHighlightedId] = useState<string>();
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleHashChange = () => {
      console.log(window.location.hash.split("#")[1]);
      setHighlightedId(window.location.hash.split("#")[1]);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="p-8 flex flex-col gap-8 relative">
      <div>
        <Typography variant="h1" className="font-roboto mb-4">
          Table of Contents
        </Typography>
        <TocList
          items={tocdata as TocItem[]}
          prefix=""
          highlightedId={highlightedId}
          expandedMap={expandedMap}
          setExpandedMap={setExpandedMap}
        />
      </div>

      <div>
        <TocRenderer data={tocdata as TocItem[]} />
      </div>

      <div
        className="fixed top-12 right-12 p-8 border rounded-3xl bg-white shadow-xl
             opacity-0 hover:opacity-100 
             scale-95 hover:scale-100 
             translate-y-2 hover:translate-y-0 
             transition-all duration-300 ease-in-out"
      >
        {/* <TocList items={tocdata as TocItem[]} /> */}
        <TocList
          items={tocdata as TocItem[]}
          prefix=""
          highlightedId={highlightedId}
          expandedMap={expandedMap}
          setExpandedMap={setExpandedMap}
        />
      </div>
    </div>
  );
};

const TocList: React.FC<{
  items: TocItem[];
  prefix?: string;
  highlightedId?: string;
  expandedMap: Record<string, boolean>;
  setExpandedMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}> = ({ items, prefix = "", highlightedId, expandedMap, setExpandedMap }) => {
  return (
    <ul className="ml-4">
      {items.map((item, index) => {
        const currentPrefix = prefix
          ? `${prefix}.${index + 1}`
          : `${index + 1}`;
        const anchorId = `section-${currentPrefix}`;
        const isExpanded = expandedMap[anchorId] || false;

        const toggleExpand = (e: React.MouseEvent) => {
          e.preventDefault(); // prevent anchor jump
          setExpandedMap((prev) => ({
            ...prev,
            [anchorId]: !prev[anchorId],
          }));
        };

        return (
          <li key={anchorId}>
            <a
              href={`#${anchorId}`}
              className={`text-red-600 hover:underline cursor-pointer block ${
                highlightedId === anchorId ? "font-bold" : ""
              }`}
            >
              {item?.children?.length > 0 && (
                <span
                  className="mr-2 text-sm text-gray-500"
                  onClick={toggleExpand}
                >
                  {isExpanded ? "📂" : "📁"}
                </span>
              )}
              {currentPrefix}. {item.title}
            </a>

            {isExpanded && item?.children?.length > 0 && (
              <TocList
                items={item?.children}
                prefix={currentPrefix}
                highlightedId={highlightedId}
                expandedMap={expandedMap}
                setExpandedMap={setExpandedMap}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

const TocRenderer: React.FC<{ data: TocItem[]; prefix?: string }> = ({
  data,
  prefix = "",
}) => {
  return (
    <div className="flex flex-col items-baseline">
      {data.map((item, idx) => {
        const currentPrefix = prefix ? `${prefix}.${idx + 1}` : `${idx + 1}`;
        const anchorId = `section-${currentPrefix}`;

        return (
          <div
            key={anchorId}
            className="mb-4 flex flex-col items-baseline"
            id={anchorId}
          >
            <Typography variant={item.level}>
              {currentPrefix} {item.title}
            </Typography>
            <Typography variant="p">{item.content}</Typography>

            {item.children && item.children.length > 0 && (
              <TocRenderer data={item.children} prefix={currentPrefix} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Toc;
