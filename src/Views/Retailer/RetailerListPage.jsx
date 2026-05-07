import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import Breadcrumb from "../../Components/Breadcrumb";

import CommonSnackbar from "../../components/CommonSnackbar";

import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog";

import RetailerForm from "./RetailerForm";

import {
  getRetailersApi,
  createRetailerApi,
  updateRetailerApi,
  deleteRetailerApi,
} from "../../api/retailer.api";

export default function RetailerListPage() {
  const [loading, setLoading] = useState(false);

  const [retailers, setRetailers] = useState([]);

  const [sorting, setSorting] = useState([]);

  const [globalFilter, setGlobalFilter] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [editData, setEditData] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedRetailer, setSelectedRetailer] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // SNACKBAR CLOSE
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // FETCH RETAILERS
  const fetchRetailers = async () => {
    try {
      setLoading(true);

      const response = await getRetailersApi(1, 1000);

      console.log(response);

      setRetailers(response?.data?.data || []);
    } catch (error) {
      console.log(error);

      setRetailers([]);

      setSnackbar({
        open: true,
        message: "Failed to fetch retailers",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRetailers();
  }, []);

  // SAVE
  const handleSave = async (formData) => {
    try {
      setLoading(true);

      const payload = {
        shopName: formData.shopName,

        ownerName: formData.ownerName,

        phoneNumber: formData.phoneNumber,

        address: formData.address,

        creditLimit: Number(formData.creditLimit),

        createdBy: 1000,

        updatedBy: 1000,
      };

      // UPDATE
      if (editData) {
        await updateRetailerApi(editData.RETAILER_ID, {
          ...payload,
          updatedBy: 1000,
        });

        setSnackbar({
          open: true,
          message: "Retailer updated successfully",
          severity: "success",
        });
      } else {
        // CREATE
        await createRetailerApi(payload);

        setSnackbar({
          open: true,
          message: "Retailer created successfully",
          severity: "success",
        });
      }

      setOpenForm(false);

      setEditData(null);

      fetchRetailers();
    } catch (error) {
      console.log(error);

      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Something went wrong",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ADD
  const handleAdd = () => {
    setEditData(null);

    setOpenForm(true);
  };

  // EDIT
  const handleEdit = (row) => {
    setEditData(row);

    setOpenForm(true);
  };

  // DELETE CLICK
  const handleDeleteClick = (row) => {
    setSelectedRetailer(row);

    setDeleteDialogOpen(true);
  };

  // CONFIRM DELETE
  const confirmDeleteRetailer = async () => {
    try {
      setLoading(true);

      await deleteRetailerApi(selectedRetailer.RETAILER_ID, {
        updatedBy: 1000,
      });

      setSnackbar({
        open: true,
        message: "Retailer deleted successfully",
        severity: "success",
      });

      setDeleteDialogOpen(false);

      setSelectedRetailer(null);

      fetchRetailers();
    } catch (error) {
      console.log(error);

      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Failed to delete retailer",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // FILTERED DATA
  const filteredData = useMemo(() => {
    if (!globalFilter) return retailers;

    return retailers.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(globalFilter.toLowerCase()),
    );
  }, [retailers, globalFilter]);

  // COLUMNS
  const columns = useMemo(
    () => [
      {
        header: "SHOP NAME",
        accessorKey: "SHOP_NAME",
      },

      {
        header: "OWNER NAME",
        accessorKey: "OWNER_NAME",
      },

      {
        header: "PHONE NUMBER",
        accessorKey: "PHONE_NUMBER",
      },

      {
        header: "ADDRESS",
        accessorKey: "ADDRESS",
      },

      {
        header: "DUES",
        accessorKey: "CREDIT_LIMIT",
      },

      {
        header: "ACTIONS",

        cell: ({ row }) => (
          <Stack direction="row" spacing={1}>
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleEdit(row.original)}
            >
              <EditOutlinedIcon />
            </IconButton>

            <IconButton
              color="error"
              size="small"
              onClick={() => handleDeleteClick(row.original)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Stack>
        ),
      },
    ],
    [],
  );

  // TABLE
  const table = useReactTable({
    data: filteredData,

    columns,

    state: {
      sorting,
    },

    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Box p={3}>
      <Breadcrumb
        heading="Retailer List"
        showBreadcrumb={false}
        showHeading={true}
      />

      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <Box
          p={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <TextField
            placeholder={`Search ${filteredData.length} records...`}
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
            onClick={handleAdd}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Add Retailer
          </Button>
        </Box>

        {/* TABLE */}
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  sx={{
                    backgroundColor: "#fafafa",
                  }}
                >
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      sx={{
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            ml: 0.3,
                            lineHeight: 0.7,
                          }}
                        >
                          <KeyboardArrowUpIcon
                            sx={{
                              fontSize: 12,
                              color:
                                header.column.getIsSorted() === "asc"
                                  ? "#BDBDBD"
                                  : "#D6D6D6",
                              mb: -0.3,
                            }}
                          />

                          <KeyboardArrowDownIcon
                            sx={{
                              fontSize: 12,
                              color:
                                header.column.getIsSorted() === "desc"
                                  ? "#BDBDBD"
                                  : "#D6D6D6",
                              mt: -0.3,
                            }}
                          />
                        </Box>
                      </Stack>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: "#fafafa",
                      },
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell ??
                            cell.column.columnDef.accessorKey,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* PAGINATION */}
        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
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
            <IconButton
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <FirstPageIcon />
            </IconButton>

            <IconButton
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon />
            </IconButton>

            <Button variant="contained" size="small">
              {table.getState().pagination.pageIndex + 1}
            </Button>

            <IconButton
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
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
      </Paper>

      {/* FORM */}
      {openForm && (
        <RetailerForm
          open={openForm}
          data={editData}
          loading={loading}
          onClose={() => {
            setOpenForm(false);

            setEditData(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* DELETE DIALOG */}
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);

          setSelectedRetailer(null);
        }}
        onConfirm={confirmDeleteRetailer}
        title="Delete Retailer"
        message="Are you sure you want to delete this retailer?"
      />

      {/* SNACKBAR */}
      <CommonSnackbar
        open={snackbar.open}
        handleClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
}
