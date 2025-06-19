import React from "react";
import type { TocListProps } from "../../types";

const TocList: React.FC<TocListProps> = ({
  items,
  prefix = "",
  highlightedId,
  expandedMap,
  setExpandedMap,
  isCollapsible = true,
  activeColor,
}) => {
  return (
    <ul className="ml-4">
      {items.map((item, index) => {
        const currentPrefix = prefix
          ? `${prefix}.${index + 1}`
          : `${index + 1}`;
        const anchorId = `section-${currentPrefix}`;
        const isExpanded = isCollapsible ? expandedMap[anchorId] : true;

        const toggleExpand = (e: React.MouseEvent) => {
          e.preventDefault(); // Prevents jump on hash change
          setExpandedMap((prev) => ({
            ...prev,
            [anchorId]: !prev[anchorId],
          }));
        };

        return (
          <li key={anchorId}>
            <a
              href={`#${anchorId}`}
              className={`font-Josefin hover:underline cursor-pointer block ${
                highlightedId === anchorId
                  ? `font-bold ${activeColor || "text-blue-300"}`
                  : ""
              }`}
            >
              {item.children && item.children.length > 0 && (
                <span
                  className="mr-2 text-sm text-gray-500"
                  onClick={toggleExpand}
                >
                  {isExpanded ? "📂" : "📁"}
                </span>
              )}
              {currentPrefix}. {item.title}
            </a>

            {isExpanded && item.children && item.children.length > 0 && (
              <TocList
                items={item.children}
                prefix={currentPrefix}
                highlightedId={highlightedId}
                expandedMap={expandedMap}
                setExpandedMap={setExpandedMap}
                isCollapsible={isCollapsible}
                activeColor={activeColor}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TocList;
