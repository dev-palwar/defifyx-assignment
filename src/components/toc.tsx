import type React from "react";
import { Typography } from "./ui/typography";
import tocdata from "../data/slug.json";

// export interface TocItem {
//   title: string;
//   level: "h1" | "h2" | "h3" | "h4";
//   children: TocItem[];
// }

const Toc: React.FC = () => {
  return (
    <div className="flex gap-4 flex-col ml-8 mt-4">
      <div>
        <Typography variant={"h1"} className="font-roboto">
          Table of content
        </Typography>
      </div>

      {/* Table of contents view */}
      <div className="flex flex-col gap-3">
        {tocdata.map((val, index) => {
          return (
            <>
              <ul key={index} className="container text-2xl">
                <li className="">{val.title}</li>
                {val.children.map((val, index) => {
                  return (
                    <ul key={index} className="ml-12">
                      <li className="list-disc">{val.title}</li>
                      {val.children.map((val, index) => {
                        return (
                          <ul key={index} className="ml-12">
                            <li className="list-disc">{val.title}</li>
                            {val.children.map((val, index) => {
                              return (
                                <ul key={index} className="ml-12">
                                  <li className="list-disc">{val.title}</li>
                                </ul>
                              );
                            })}
                          </ul>
                        );
                      })}
                    </ul>
                  );
                })}
              </ul>
            </>
          );
        })}
      </div>

      <div>
        {tocdata.map((h1, idx1) => (
          <div key={idx1} className="mb-6 flex flex-col items-baseline">
            <Typography variant="h1">{h1.title}</Typography>
            <Typography variant="p">{h1.content}</Typography>

            {h1.children.map((h2, idx2) => (
              <div key={idx2} className="mb-5 flex flex-col items-baseline">
                <Typography variant="h2">{h2.title}</Typography>
                <Typography variant="p">{h2.content}</Typography>

                {h2.children.map((h3, idx3) => (
                  <div key={idx3} className="mb-4 flex flex-col items-baseline">
                    <Typography variant="h3">{h3.title}</Typography>
                    <Typography variant="p">{h3.content}</Typography>

                    {h3.children.map((h4, idx4) => (
                      <div
                        key={idx4}
                        className="mb-3 flex flex-col items-baseline"
                      >
                        <Typography variant="h4">{h4.title}</Typography>
                        <Typography variant="p">{h4.content}</Typography>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toc;
