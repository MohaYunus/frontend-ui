import { useState } from "react";

export default function useTableSorting() {
  const [sorting, setSorting] = useState([]);

  return {
    sorting,
    setSorting,
  };
}
