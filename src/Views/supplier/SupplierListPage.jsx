import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";

import { dummySuppliers } from "./dummySuppliers";
import SupplierForm from "./SupplierForm";
import PageContainer from "../../layout/PageContainer";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Snackbar, Alert } from "@mui/material";

export default function SupplierListPage() {
  const [suppliers, setSuppliers] = useState(dummySuppliers);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSave = (formData) => {
    if (editData) {
      // UPDATE
      setSuppliers((prev) =>
        prev.map((s) =>
          s.id === editData.id ? { ...formData, id: editData.id } : s,
        ),
      );

      setSnackbar({
        open: true,
        message: "Supplier updated successfully",
        severity: "success",
      });
    } else {
      // CREATE
      setSuppliers((prev) => [
        ...prev,
        {
          ...formData,
          id: Date.now(),
          modifiedDate: new Date().toLocaleDateString(),
          modifiedBy: "admin",
        },
      ]);

      setSnackbar({
        open: true,
        message: "Supplier created successfully",
        severity: "success",
      });
    }

    setOpenForm(false);
    setEditData(null);
  };

  const handleAdd = () => {
    setEditData(null);
    setOpenForm(true);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setOpenForm(true);
  };

  const columns = [
    { field: "name", headerName: "SUPPLIER NAME", flex: 1, minWidth: 200 },
    {
      field: "contactPerson",
      headerName: "CONTACT PERSON",
      flex: 1,
      minWidth: 180,
    },
    { field: "phone", headerName: "PHONE", flex: 1, minWidth: 150 },
    { field: "email", headerName: "EMAIL", flex: 1, minWidth: 220 },
    {
      field: "balance",
      headerName: "BALANCE",
      minWidth: 150,
    },
    { field: "modifiedDate", headerName: "MODIFIED", width: 130 },
    { field: "modifiedBy", headerName: "MODIFIED BY", width: 130 },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 100,
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleEdit(row)}>
          <EditIcon color="primary" />
        </IconButton>
      ),
    },
  ];

  return (
    <PageContainer>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Supplier List
      </Typography>
      <Card sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <TextField
            placeholder="Search suppliers..."
            size="small"
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add Supplier
          </Button>
        </Stack>

        <DataGrid
          rows={suppliers}
          columns={columns}
          autoHeight
          pagination
          pageSizeOptions={[5, 10, 20]}
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          slots={{
            footer: () => {
              const totalPages = Math.ceil(suppliers.length / pageSize);

              return (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  px={2}
                  py={1.5}
                  sx={{
                    borderTop: "2px solid #e0e0e0",
                    mt: 1,
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="body2">Row per page</Typography>

                    <Select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(0);
                      }}
                      size="small"
                      sx={{
                        height: 32,
                        minWidth: 70,
                        "& .MuiSelect-select": {
                          padding: "4px 10px",
                        },
                      }}
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                    </Select>

                    <Typography variant="body2">Go to</Typography>

                    <Select
                      value={page + 1}
                      onChange={(e) => setPage(Number(e.target.value) - 1)}
                      size="small"
                      sx={{
                        height: 32,
                        minWidth: 60,
                        "& .MuiSelect-select": {
                          padding: "4px 10px",
                        },
                      }}
                    >
                      {Array.from({ length: totalPages }, (_, i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>

                  <Pagination
                    count={totalPages}
                    page={page + 1}
                    onChange={(e, value) => setPage(value - 1)}
                    color="primary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              );
            },
          }}
        />
      </Card>

      {openForm && (
        <SupplierForm
          open={openForm}
          data={editData}
          onClose={() => setOpenForm(false)}
          onSave={handleSave}
        />
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            minWidth: 360,
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
