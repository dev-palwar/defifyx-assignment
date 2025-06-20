# 📚 Table of Contents (ToC) Generator – DevifyX Assignment

A **Table of Contents (ToC)** component built with **React** and **Tailwind CSS**. This component supports hierarchical rendering, anchor linking, collapsible sections, smooth scroll, and more.

## 🚀 Feature list

✅ **Dynamic Parsing**

- Accepts a flat list of headings as props and parses them into a nested structure using hierarchy levels (h1–h4).

✅ **Anchor Link Generation**

- Automatically generates URL-safe anchor links using slugified heading text.

✅ **Responsive & Accessible UI**

- Built with semantic HTML (`<nav>`, `<ul>`, `<li>`, `<a>`)
- Responsive layout with Tailwind CSS

✅ **Collapsible Sections**

- Clickable indicators (📁/📂) for expanding and collapsing child nodes.

✅ **Scrollspy**

- Highlights the currently viewed section during scroll.
- Also added a **Floating Context-Aware ToC with Smart Hover Activation**
  - Appears when the user scrolls past the hero section.
  - Glows initially to guide attention.
  - Disappears after first interaction, then reappears on hover at its original position
  - Remains non-blocking and enhances accessibility during content navigation.

✅ **Smooth Scrolling**

- Clicking a ToC item smoothly scrolls to the relevant section.

✅ **Dark Mode Support**

- Tailwind-based dark mode compatible design.

✅ **Customizable via Props**

- `isCollapsible` – Enable/disable collapsible sections
- `activeColor` – Customize active highlight color
- `maxDepth` _(planned)_ – Limit ToC depth
- `titleTag` _(planned)_ – Set heading tag for ToC title (`h2`, `h3`, etc.)

---

## 📂 Project Structure

```bash
.
├── components/
│   ├── Toc.tsx             # Main ToC component
│   ├── TocList.tsx         # Recursive collapsible ToC list
│   ├── TocRenderer.tsx     # Demo content to simulate real headings
│   └── ui/
│       └── typography.tsx  # Reusable Typography component
├── types/
│   └── toc.ts              # Type definitions for all ToC-related props & interfaces
├── data/
│   └── slug.json           # Demo heading data
├── assets/
│   └── nen.jpg          # Hero poster
├── App.tsx                 # Demo usage file
```

## 🚀 Setup & Run Instructions

- Clone the Repository

```bash
git clone https://github.com/dev-palwar/defifyx-assignment

cd defifyx-assignment

npm install

npm run dev

```

The app should now be running at http://localhost:5173

- Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

## 🧩 How to Use the Table of Contents Component

You can integrate the `Toc` component like this:

```tsx
import Toc from "./components/toc";
import data from "./data/slug.json";

<Toc data={data} isCollapsible={true} activeColor="text-blue-500" />;
```

### 🔧 Props:

| Prop            | Type                      | Description                                                             |
| --------------- | ------------------------- | ----------------------------------------------------------------------- |
| `data`          | `TocItem[]`               | The nested array of headings and content.                               |
| `isCollapsible` | `boolean` (optional)      | Enables expand/collapse functionality for sub-headings.                 |
| `activeColor`   | `string` (Tailwind class) | Custom Tailwind class for highlighting the active heading in ScrollSpy. |

---

## 📁 `slug.json` Usage

A special mention to the `slug.json` file located in the `/data` directory.

### 🔍 What it is:

`slug.json` serves as the **data source** for the Table of Contents. It mimics parsed heading data and contains a structured array like:

```json
[
  {
    "title": "Introduction",
    "level": "h1",
    "content": "This section introduces the topic.",
    "children": [
      {
        "title": "Motivation",
        "level": "h2",
        "content": "Motivation for this topic."
      }
    ]
  }
]
```

### 🔗 How it works:

- This JSON is used to simulate parsed headings from a document or markdown file.
- The `Toc` component takes this data and dynamically renders:
  - Nested collapsible UI
  - Smooth scrolling
  - ScrollSpy highlighting
  - Anchor links like `#section-1.1`, `#section-1.2`, etc.

## 💬 GPT Usage Note

While the idea, design, and most of the logic were mine from scratch, I did use ChatGPT here and there to keep things smooth. Here's how:

- Used it debugging.
- First time worked with recursion like this, so I had to take a full lecture on how it was affecting re-renders.
- Got help writing this README (To avoid grammar mistake ofc).
- Gave my `types.ts` file to ChatGPT and asked it to generate some clean and meaningful comments for each type.
