import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Alert,
  Avatar,
  Stack,
} from "@mui/material";

export default function ProfilePage() {
  const [tab, setTab] = useState(0);

  const [profile, setProfile] = useState(null);

  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.status === "S") {
        setProfile(result.data.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = async () => {
    setError("");
    setMessage("");

    if (
      !passwordForm.old_password ||
      !passwordForm.new_password ||
      !passwordForm.confirm_password
    ) {
      setError("Please fill all password fields");
      return;
    }

    if (
      passwordForm.new_password !== passwordForm.confirm_password
    ) {
      setError("New Password and Confirm Password must match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/changePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            old_password: passwordForm.old_password,
            new_password: passwordForm.new_password,
            confirm_password: passwordForm.confirm_password,
          }),
        },
      );

      const result = await response.json();

      if (response.ok && result.status === "S") {
        setMessage("Password updated successfully");
        setPasswordForm({
          old_password: "",
          new_password: "",
          confirm_password: "",
        });
      } else {
        setError(result.message || "Failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server Error");
    }
  };

  return (
    <Box p={4}>
      <Card sx={{ p: 4, borderRadius: 3 }}>
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          sx={{ mb: 4 }}
        >
          <Tab label="Profile" />
          <Tab label="Change Password" />
        </Tabs>

        {tab === 0 && (
          <Box display="flex" gap={4}>
            <Card
              sx={{
                p: 4,
                width: 300,
                textAlign: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mb: 2,
                }}
              >
                A
              </Avatar>

              <Typography fontWeight={700}>
                {profile?.USER_NAME || "User"}
              </Typography>

              <Typography color="text.secondary">
                {profile?.ROLE_CODE || "ADMIN"}
              </Typography>
            </Card>

            <Box>
              <Typography mb={2}>
                <strong>Name:</strong>{" "}
                {profile?.FIRST_NAME} {profile?.LAST_NAME}
              </Typography>

              <Typography mb={2}>
                <strong>Email:</strong>{" "}
                {profile?.EMAIL_ADDRESS}
              </Typography>

              <Typography mb={2}>
                <strong>Role:</strong>{" "}
                {profile?.ROLE_CODE}
              </Typography>
            </Box>
          </Box>
        )}

        {tab === 1 && (
          <Box maxWidth={500}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {message && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {message}
              </Alert>
            )}

            <Stack spacing={3}>
              <TextField
                label="Old Password"
                name="old_password"
                type="password"
                value={passwordForm.old_password}
                onChange={handlePasswordChange}
                fullWidth
              />

              <TextField
                label="New Password"
                name="new_password"
                type="password"
                value={passwordForm.new_password}
                onChange={handlePasswordChange}
                fullWidth
              />

              <TextField
                label="Confirm Password"
                name="confirm_password"
                type="password"
                value={passwordForm.confirm_password}
                onChange={handlePasswordChange}
                fullWidth
              />

              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  onClick={handleChangePassword}
                >
                  Update Password
                </Button>

                <Button variant="outlined">
                  Cancel
                </Button>
              </Box>
            </Stack>
          </Box>
        )}
      </Card>
    </Box>
  );
}

