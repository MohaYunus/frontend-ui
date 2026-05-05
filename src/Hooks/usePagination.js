import { useState } from "react";

export default function usePagination(initialPageSize = 10) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  return {
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
  };
}
