import { Box } from "@mui/material";

export default function PageContainer({ children }) {
  return (
    <Box width="100%" px={3} py={2} boxSizing="border-box">
      <Box width="100%" maxWidth="1400px" margin="0 auto">
        {children}
      </Box>
    </Box>
  );
}
