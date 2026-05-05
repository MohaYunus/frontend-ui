import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
  IconButton,
  InputAdornment,
  Paper
} from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import warehouseBg from "../../assets/logo/ChatGPT Image Apr 25, 2026, 01_05_30 PM.png";
import apnaLogo from "../../assets/logo/ChatGPT Image Apr 25, 2026, 01_09_44 PM.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    rememberMe: false
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleLogin = async () => {
    try {
      setError("");

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          identifier: form.username,
          password: form.password
        })
      });

      const result = await response.json();

      if (response.ok && result.status === "S") {
        localStorage.setItem("token", result.data.token);

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            username: form.username,
            fullName: form.username,
            role: result.data.role_id === 1000 ? "ADMIN" : "USER"
          })
        );

        navigate("/");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  const inputStyle = {
    borderRadius: "14px",
    height: 66,
    fontSize: 16,
    background: "#fff"
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "#041B4D",
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          width: "60%",
          position: "relative",
          backgroundImage: `url(${warehouseBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          px: 8,
          color: "#fff",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(2, 18, 72, 0.82)",
          }}
        />

        {/* Left Features */}
        <Box
          sx={{
            position: "absolute",
            left: 50,
            top: "22%",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {[
            {
              icon: <Inventory2OutlinedIcon sx={{ fontSize: 34, mb: 1 }} />,
              title1: "Inventory",
              title2: "Management",
            },
            {
              icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 34, mb: 1 }} />,
              title1: "Purchase",
              title2: "Management",
            },
            {
              icon: <GroupsOutlinedIcon sx={{ fontSize: 34, mb: 1 }} />,
              title1: "Customer",
              title2: "Management",
            },
            {
              icon: <BarChartOutlinedIcon sx={{ fontSize: 34, mb: 1 }} />,
              title1: "Sales",
              title2: "Analytics",
            },
            {
              icon: <SettingsOutlinedIcon sx={{ fontSize: 34, mb: 1 }} />,
              title1: "System",
              title2: "Control",
            },
          ].map((item, index) => (
            <Box key={index} textAlign="center">
              {item.icon}
              <Typography fontSize={14}>{item.title1}</Typography>
              <Typography fontSize={14}>{item.title2}</Typography>
            </Box>
          ))}
        </Box>

        {/* Center Branding */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={apnaLogo}
            alt="Apna Logo"
            sx={{
              width: 680,
              maxWidth: "100%",
              mb: 2,
              ml: 10,
              mt: -8,
            }}
          />

          <Typography
            sx={{
              fontSize: 38,
              fontWeight: 700,
              mb: 2,
              mt: -3,
              ml: 10,
              textAlign: "center",
            }}
          >
            Manage. Monitor. Maximize.
          </Typography>

          <Typography
            sx={{
              fontSize: 22,
              maxWidth: 650,
              lineHeight: 1.8,
              textAlign: "center",
              mt: -1,
              ml: 10,
            }}
          >
            A complete solution to streamline your wholesale business
            operations.
          </Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0B2A75",
          p: 4,
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 620,
            borderRadius: "28px",
            p: 6,
            background: "#ffffff",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          }}
        >
          <Typography
            textAlign="center"
            fontSize={54}
            fontWeight={800}
            color="#0B1B4B"
          >
            Welcome Back!
          </Typography>

          <Typography textAlign="center" fontSize={18} color="#6B7280" mb={4}>
            Sign in to access your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Typography fontWeight={700} mb={1}>
            Username
          </Typography>

          <TextField
            fullWidth
            name="username"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
              sx: inputStyle,
            }}
          />

          <Typography fontWeight={700} mb={1}>
            Password
          </Typography>

          <TextField
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: inputStyle,
            }}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />
              }
              label="Remember me"
            />

            <Typography
              component={Link}
              to="/forgot-password"
              sx={{
                textDecoration: "none",
                color: "#2563EB",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={handleLogin}
            sx={{
              py: 2.2,
              borderRadius: "14px",
              fontSize: 22,
              fontWeight: 700,
              textTransform: "none",
              background: "linear-gradient(90deg, #1565F9 0%, #0B47C9 100%)",
              boxShadow: "0 10px 30px rgba(21,101,249,0.35)",
              mb: 4,
            }}
          >
            Sign In
          </Button>

          <Box display="flex" alignItems="center" gap={2} mb={4}>
            <Box flex={1} height="1px" bgcolor="#ddd" />
            <Typography color="#777">or continue with</Typography>
            <Box flex={1} height="1px" bgcolor="#ddd" />
          </Box>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<SecurityOutlinedIcon />}
            sx={{
              py: 1.8,
              borderRadius: "12px",
              fontSize: 18,
              fontWeight: 600,
              textTransform: "none",
              borderColor: "#D1D5DB",
              color: "#111827",
            }}
          >
            SSO / Single Sign-On
          </Button>

          <Box mt={5} display="flex" justifyContent="space-between">
            <Typography fontSize={14}>
              Secure
              <br />
              Your Data is Safe
            </Typography>

            <Typography fontSize={14}>
              Reliable
              <br />
              99.9% Uptime
            </Typography>

            <Typography fontSize={14}>
              Efficient
              <br />
              Built for Growth
            </Typography>
          </Box>
        </Paper>

        <Typography textAlign="center" mt={4} fontSize={14} color="#D1D5DB">
          © 2026 Apna Wholesale Management System. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
