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

function App() {
  const [searchText, setSearchText] = useState("");
  const { jobItems, isLoading } = useJobItems(searchText);

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
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItems} isLoading={isLoading} />

          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;