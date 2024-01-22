import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useState } from "react";

export default function BookmarksButton() {
  const [isOpenBookmarks, setIsOpenBookmarks] = useState(false);

  return (
    <section>
      <button
        className="bookmarks-btn"
        onClick={() => setIsOpenBookmarks((prev) => !prev)}
      >
        Bookmarks <TriangleDownIcon />
      </button>
      {isOpenBookmarks && <BookmarksPopover />}
    </section>
  );
}
