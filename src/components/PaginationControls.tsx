import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { pageDirection } from "../lib/types";

type PaginationControlsProps = {
  onClick: (direction: pageDirection) => void;
  currentPage: number;
  totalNumberOfPages: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
  totalNumberOfPages,
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

      {currentPage < totalNumberOfPages && (
        <PaginationButton
          onClick={() => onClick("next")}
          direction="next"
          currentPage={currentPage}
        />
      )}
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
  direction: pageDirection;
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
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
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
