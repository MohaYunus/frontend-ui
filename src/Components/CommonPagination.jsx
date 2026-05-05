import React from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function CommonPagination({ table }) {
  return (
    <Box p={2} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2">Row per page</Typography>

        <TextField
          select
          size="small"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          sx={{ width: 80 }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <MenuItem key={pageSize} value={pageSize}>
              {pageSize}
            </MenuItem>
          ))}
        </TextField>

        <Typography variant="body2">Go to</Typography>

        <TextField
          size="small"
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          sx={{ width: 70 }}
        />
      </Stack>

      <Stack direction="row" spacing={1}>
        <IconButton onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          <FirstPageIcon />
        </IconButton>

        <IconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ChevronLeftIcon />
        </IconButton>

        <Button variant="contained" size="small">
          {table.getState().pagination.pageIndex + 1}
        </Button>

        <IconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <ChevronRightIcon />
        </IconButton>

        <IconButton
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <LastPageIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
