import React from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

export default function CommonSearchBar({
  globalFilter,
  setGlobalFilter,
  totalCount,
  buttonText,
  onAdd,
}) {
  return (
    <Box p={3} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
      <TextField
        placeholder={`Search ${totalCount} records...`}
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        size="small"
        sx={{ width: 320 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
}
