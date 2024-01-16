import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";

import SearchForm from "./SearchForm";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useJobItems } from "../hooks/useJobItmes";
import { useDebounce } from "../hooks/useDebounce";

function App() {
  const [searchText, setSearchText] = useState("");
  const debounceSearchText = useDebounce(searchText, 700);
  const { jobItems, isLoading } = useJobItems(debounceSearchText);

  const resultsCount = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount resultsCount={resultsCount} />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />

          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
