import React from "react";
import { Stack, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function CommonActionButtons({ row, onEdit, onDelete }) {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton color="primary" size="small" onClick={() => onEdit(row)}>
        <EditOutlinedIcon />
      </IconButton>

      <IconButton color="error" size="small" onClick={() => onDelete(row)}>
        <DeleteOutlineIcon />
      </IconButton>
    </Stack>
  );
}
