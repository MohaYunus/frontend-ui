import { useMemo, useState } from "react";

export default function useSearchFilter(data = []) {
  const [globalFilter, setGlobalFilter] = useState("");

  const filteredData = useMemo(() => {
    if (!globalFilter) return data;

    return data.filter((item) =>
      JSON.stringify(item)
        .toLowerCase()
        .includes(globalFilter.toLowerCase())
    );
  }, [data, globalFilter]);

  return {
    globalFilter,
    setGlobalFilter,
    filteredData,
  };
}
