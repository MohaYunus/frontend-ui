import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f6fa"
    >
      <Card sx={{ p: 4, width: 420 }}>
        
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5">
            Forgot Password
          </Typography>

          <Typography
            component={Link}
            to="/login"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              fontSize: 14,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Back to Login
          </Typography>
        </Box>

        <Stack spacing={3}>
          <TextField
            label="User Name"
            fullWidth
          />

          <TextField
            label="Email Address"
            fullWidth
          />

          <Typography variant="body2" color="text.secondary">
            Do not forget to check SPAM box.
          </Typography>

          <Button variant="contained">
            Send Password Reset Email
          </Button>

          <Typography variant="caption" color="text.secondary">
            If you do not have an email address, please contact the administrator for a password reset.
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}