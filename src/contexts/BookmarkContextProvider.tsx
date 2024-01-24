import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useJobItems } from "../hooks/useJobItems";
import { jobItemExpanded } from "../lib/types";

type BookmarkContextProviderProps = {
  children: React.ReactNode;
};

type BookmarkContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookMarkedJobItems: jobItemExpanded[];
  isLoading: boolean;
};

export const BookmarkContext = createContext<BookmarkContext | null>(null);

export default function BookmarkContextProvider({
  children,
}: BookmarkContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const { jobItems: bookMarkedJobItems, isLoading } =
    useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        handleToggleBookmark,
        bookmarkedIds,
        bookMarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
