import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type BookmarkContextProviderProps = {
  children: React.ReactNode;
};

type BookmarkContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
};

export const BookmarkContext = createContext<BookmarkContext | null>(null);

export default function BookmarkContextProvider({
  children,
}: BookmarkContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarkContext.Provider value={{ handleToggleBookmark, bookmarkedIds }}>
      {children}
    </BookmarkContext.Provider>
  );
}
