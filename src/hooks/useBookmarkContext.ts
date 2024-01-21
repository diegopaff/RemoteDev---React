import { useContext } from "react";
import { BookmarkContext } from "../contexts/BookmarkContextProvider";

export function useBookmarkContext() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error(
      "You ar calling useBookmarkContext outside of the BookmarksContextProvider scope"
    );
  }

  return context;
}
