import React from "react";
import { Chip } from "@mui/material";

export default function StatusChip({ status }) {
  return (
    <Chip
      label={status}
      size="small"
      color={status === "ACTIVE" ? "success" : "error"}
      variant="outlined"
    />
  );
}
