import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { getSortedRowModel } from "@tanstack/react-table";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Breadcrumb from "../../../Components/Breadcrumb";

export default function UserRoleMappingListPage() {
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [sorting, setSorting] = useState([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      console.log(result);

      if (result?.status === "S") {
        setUsers(result?.data?.users || []);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredData = useMemo(() => {
    if (!globalFilter) return users;

    return users.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(globalFilter.toLowerCase()),
    );
  }, [users, globalFilter]);

  const columns = useMemo(
    () => [
      {
        header: "USER NAME",
        accessorKey: "USER_NAME",
      },
      {
        header: "FIRST NAME",
        accessorKey: "FIRST_NAME",
      },
      {
        header: "LAST NAME",
        accessorKey: "LAST_NAME",
      },
      {
        header: "EMAIL",
        accessorKey: "EMAIL_ADDRESS",
      },
      {
        header: "ROLE",
        accessorKey: "ROLE_NAME",
      },
      {
        header: "STATUS",
        accessorKey: "USER_STATUS",
        cell: ({ row }) => {
          const status = row.original.USER_STATUS;

          return (
            <Chip
              label={status}
              size="small"
              color={status === "ACTIVE" ? "success" : "error"}
              variant="outlined"
            />
          );
        },
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
              onClick={() => handleDelete(row.original)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Stack>
        ),
      },
    ],
    [],
  );

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

  const navigate = useNavigate();

  const handleEdit = (row) => {
    navigate(`/configuration/user-role-mapping/edit/${row.USER_ID}`);
  };

  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${row.USER_NAME}?`,
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/users/${row.USER_ID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (result.status === "S") {
        alert("User deleted successfully");
        fetchUsers(); // reload table
      } else {
        alert(result.message || "Delete failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleAdd = () => {
    navigate("/configuration/user-role-mapping/add");
  };

  return (
    <Box p={3}>
      <Breadcrumb
        heading="User Role Mapping"
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
        {/* Top Header */}
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
            Add User Role Mapping
          </Button>
        </Box>

        {/* Table */}
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

        {/* Pagination */}
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
    </Box>
  );
}
