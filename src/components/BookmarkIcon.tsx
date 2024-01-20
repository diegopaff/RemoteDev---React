import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarkContext } from "../contexts/BookmarkContextProvider";

type BookmarkIconProps = {
  id: number;
};
export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { handleToggleBookmark, bookmarkedIds } = useContext(BookmarkContext);

  const isBookmarked = bookmarkedIds.includes(id);
  return (
    <button
      onClick={(e) => {
        handleToggleBookmark(id);
        e.stopPropagation(); //stop event bubbling up
        e.preventDefault(); // stop anchor tag default behaivor
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon className={` ${isBookmarked ? "filled" : ""}`} />
    </button>
  );
}
