import { createContext, useState } from "react";

type BookmarkContextProviderProps = {
  children: React.ReactNode;
};

export const BookmarkContext = createContext(null);

export default function BookmarkContextProvider({
  children,
}: BookmarkContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

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
