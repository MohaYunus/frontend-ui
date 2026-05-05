import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function EmailSentPage() {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4" color="success.main" mb={2}>
        Email Sent Successfully ✅
      </Typography>

      <Typography mb={4}>
        Username and password have been sent to your email.
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to="/login"
      >
        Go to Login Page
      </Button>
    </Box>
  );
}