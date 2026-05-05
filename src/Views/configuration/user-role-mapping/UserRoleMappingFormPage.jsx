// src/Views/user-role-mapping/UserRoleMappingFormPage.jsx

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CommonSnackbar from "../../../components/CommonSnackbar";

export default function UserRoleMappingFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    user_name: "",
    title: "MR",
    first_name: "",
    middle_name: "",
    last_name: "",
    email_address: "",
    password: "",
    role: "ADMIN",
    phone_code: "+91",
    phone_number: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (response.ok && result.status === "S") {
        const user = result.data.user;

        setForm({
          user_name: user.USER_NAME || "",
          title: user.TITLE || "MR",
          first_name: user.FIRST_NAME || "",
          middle_name: user.MIDDLE_NAME || "",
          last_name: user.LAST_NAME || "",
          email_address: user.EMAIL_ADDRESS || "",
          password: "",
          role: user.ROLE_CODE || "ADMIN",
          phone_code: user.PHONE_CODE || "+91",
          phone_number: user.PHONE_NUMBER || "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchSingleUser();
    }
  }, [id]);

  const handleSubmit = async () => {
    let newErrors = {};

    if (!form.first_name.trim()) {
      newErrors.first_name = "First Name is required";
    }

    if (!form.last_name.trim()) {
      newErrors.last_name = "Last Name is required";
    }

    if (!form.middle_name.trim()) {
      newErrors.middle_name = "Middle Name is required";
    }

    if (!form.user_name.trim()) {
      newErrors.user_name = "User Name is required";
    }

    if (!form.phone_number.trim()) {
      newErrors.phone_number = "Phone Number is required";
    }

    if (!form.email_address.trim()) {
      newErrors.email_address = "Email Address is required";
    }

    if (!form.title) {
      newErrors.title = "Title is required";
    }

    if (!form.role) {
      newErrors.role = "Role is required";
    }

    if (!isEdit && !form.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const url = isEdit
        ? `http://localhost:5000/api/users/${id}`
        : `http://localhost:5000/api/users`;

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok && result.status === "S") {
        setSnackbar({
          open: true,
          message: isEdit ? "Updated Successfully" : "Created Successfully",
          severity: "success",
        });

        setTimeout(() => {
          navigate("/configuration/user-role-mapping");
        }, 500);
      } else {
        setSnackbar({
          open: true,
          message: result.message || "Operation failed",
          severity: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        {isEdit ? "Edit User Role Mapping" : "Add User Role Mapping"}
      </Typography>

      <Card
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={3}>
          {/* 1st Row */}
          <Box display="flex" gap={2}>
            <TextField
              name="first_name"
              label="First Name"
              placeholder="Enter first name"
              value={form.first_name}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.first_name}
              helperText={errors.first_name}
            />

            <TextField
              name="last_name"
              label="Last Name"
              placeholder="Enter last name"
              value={form.last_name}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.last_name}
              helperText={errors.last_name}
            />
          </Box>

          {/* 2nd Row */}
          <Box display="flex" gap={2}>
            <TextField
              name="middle_name"
              label="Middle Name"
              placeholder="Enter middle name"
              value={form.middle_name}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.middle_name}
              helperText={errors.middle_name}
            />

            <TextField
              name="user_name"
              label="User Name"
              placeholder="Enter user name"
              value={form.user_name}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.user_name}
              helperText={errors.user_name}
            />
          </Box>

          {/* 3rd Row */}
          <Box display="flex" gap={2}>
            {/* Left side = Phone Code + Phone Number (half row) */}
            <Box display="flex" gap={2} flex={1}>
              <TextField
                select
                name="phone_code"
                label="Phone Code"
                value={form.phone_code}
                onChange={handleChange}
                required
                sx={{
                  width: "110px", // small width only for +91
                }}
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="+91">+91</MenuItem>
                <MenuItem value="+1">+1</MenuItem>
                <MenuItem value="+44">+44</MenuItem>
                error={!!errors.phone_code}
                helperText={errors.phone_code}
              </TextField>

              <TextField
                name="phone_number"
                label="Phone Number"
                placeholder="Enter phone number"
                value={form.phone_number}
                onChange={handleChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.phone_number}
                helperText={errors.phone_number}
              />
            </Box>

            {/* Right side = Title ID (half row) */}
            <TextField
              select
              name="title"
              label="Title ID"
              value={form.title}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                flex: 1,
              }}
            >
              <MenuItem value="MR">Mr</MenuItem>
              <MenuItem value="MRS">Mrs</MenuItem>
              <MenuItem value="MS">Ms</MenuItem>
              <MenuItem value="DR">Dr</MenuItem>
              error={!!errors.title}
              helperText={errors.title}
            </TextField>
          </Box>

          {/* Email + Role Row */}
          <Box display="flex" gap={2}>
            <TextField
              name="email_address"
              label="Email Address"
              placeholder="Enter email address"
              value={form.email_address}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.email_address}
              helperText={errors.email_address}
            />

            <TextField
              select
              name="role"
              label="Role"
              value={form.role}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="SALES">SALES</MenuItem>
              <MenuItem value="ACCOUNT">ACCOUNT</MenuItem>
              <MenuItem value="MANAGER">MANAGER</MenuItem>
              error={!!errors.role}
              helperText={errors.role}
            </TextField>
          </Box>

          {/* Password Row */}
          <Box display="flex" gap={2}>
            {!isEdit && (
              <TextField
                name="password"
                label="Password"
                placeholder="Enter password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                sx={{
                  width: "49.5%", // half row only
                }}
                error={!!errors.password}
                helperText={errors.password}
              />
            )}
          </Box>

          {/* Buttons */}
          <Box display="flex" gap={2} mt={2}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                px: 4,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {loading ? "Please wait..." : isEdit ? "Update" : "Save"}
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/configuration/user-role-mapping")}
              sx={{
                px: 4,
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </Card>
      <CommonSnackbar
        open={snackbar.open}
        handleClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
}
