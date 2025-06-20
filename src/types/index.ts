/**
 * Represents a single item in the Table of Contents.
 */
export interface TocItem {
  title: string;
  level: "h1" | "h2" | "h3" | "h4";
  content: string;
  children?: TocItem[];
}

/**
 * Props for the main <Toc /> component.
 */
export interface TocProps {
  data: TocItem[]; // Array of TOC items
  isCollapsible?: boolean; // Enable/disable collapse toggling
  activeColor?: string; // Optional Tailwind class for active link
}

/**
 * Props for the recursive <TocList /> component.
 */
export interface TocListProps {
  items: TocItem[];
  prefix?: string;
  highlightedId?: string;
  expandedMap: Record<string, boolean>;
  setExpandedMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  isCollapsible?: boolean;
  activeColor?: string;
}
