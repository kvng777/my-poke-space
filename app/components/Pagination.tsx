interface PaginationProps {
  currentPage: number;
  goToPage: (page: number) => void;
  hasNext: string | null;
  hasPrev: string | null;
}

export default function Pagination({ currentPage, goToPage, hasNext, hasPrev }: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 py-4">
      { hasPrev &&
        <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={() => goToPage(currentPage - 1)}>
          Previous
        </button>
      }
      
      
      { hasNext &&
        <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={() => goToPage(currentPage + 1)}>
          Next
        </button>
      }
    </div>
  );
}
