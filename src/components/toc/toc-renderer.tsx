import React from "react";
import { Typography } from "../ui/typography";
import type { TocItem } from "../../types";

interface TocRendererProps {
  data: TocItem[];
  prefix?: string;
}

const TocRenderer: React.FC<TocRendererProps> = ({ data, prefix = "" }) => {
  return (
    <div className="flex flex-col items-baseline">
      {data.map((item, idx) => {
        const currentPrefix = prefix ? `${prefix}.${idx + 1}` : `${idx + 1}`;
        const anchorId = `section-${currentPrefix}`;

        return (
          <div
            key={anchorId}
            className="mb-4 flex flex-col items-baseline ml-4"
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

export default TocRenderer;
