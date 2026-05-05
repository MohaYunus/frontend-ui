import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box display="flex" width="100vw" height="100vh" overflow="hidden">
      <Sidebar collapsed={collapsed} />

      <Box flex={1} minWidth={0} display="flex" flexDirection="column">
        <Header onToggleSidebar={() => setCollapsed(!collapsed)} />

        <Box flex={1} width="100%" overflow="auto" bgcolor="#f7f8fa">
          <Outlet />  
        </Box>
      </Box>
    </Box>
  );
}