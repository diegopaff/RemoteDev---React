import { useBookmarkContext } from "../hooks/useBookmarkContext";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const { bookMarkedJobItems, isLoading } = useBookmarkContext();
  return (
    <div className="bookmarks-popover">
      <JobList jobItems={bookMarkedJobItems} isLoading={isLoading} />
    </div>
  );
}
