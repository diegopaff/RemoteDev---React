import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  onClick: (direction: "next" | "previous") => void;
  currentPage: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage !== 1 && (
        <PaginationButton
          onClick={() => onClick("previous")}
          direction="previous"
          currentPage={currentPage}
        />
      )}

      <PaginationButton
        onClick={() => onClick("next")}
        direction="next"
        currentPage={currentPage}
      />
      {/*  <button
        onClick={() => onClick("previous")}
        className={`pagination__button ${
          currentPage === 1 ? "pagination__button--hidden" : ""
        }`}
      >
        <ArrowLeftIcon />
        Page {currentPage - 1}
      </button>
      <button onClick={() => onClick("next")} className="pagination__button">
        <ArrowRightIcon />
        Page {currentPage + 1}
      </button> */}
    </section>
  );
}

//** Pagination Button component **//
type PaginationButtonProps = {
  direction: "next" | "previous";
  currentPage: number;
  onClick: () => void;
};

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "next" && (
        <>
          <ArrowRightIcon />
          Page {currentPage + 1}
        </>
      )}

      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
    </button>
  );
}
