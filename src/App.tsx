import Toc from "./components/toc/toc";
import data from "./data/slug.json";
import type { TocItem } from "./types";

function App() {
  return (
    <div className="font-roboto">
      <Toc data={data as TocItem[]} />
    </div>
  );
}

export default App;
