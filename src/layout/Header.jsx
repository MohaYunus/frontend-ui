import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Badge,
  Dialog,
  InputAdornment,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import SearchIcon from "@mui/icons-material/Search";

export default function Header({ onToggleSidebar }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  // 🔹 CTRL + K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenSearch(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <>
      <Box
        height={64}
        px={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid #e0e0e0"
        bgcolor="#fff"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={onToggleSidebar}>
            <MenuIcon />
          </IconButton>

          <TextField
            size="small"
            placeholder="Search (Ctrl + K)"
            onClick={() => setOpenSearch(true)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton>
            <Badge badgeContent={2} color="primary">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={toggleFullscreen}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Box>
      </Box>

      <Dialog
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        fullWidth
        maxWidth="sm"
      >
        <Box p={3}>
          <Typography variant="h6" mb={2}>
            Search
          </Typography>

          <TextField
            autoFocus
            fullWidth
            placeholder="Type to search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Dialog>
    </>
  );
}
