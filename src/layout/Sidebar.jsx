import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AnapLogo from "../assets/logo/anap-logo.png";

export default function Sidebar({ collapsed }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  // Supplier dropdown
  const [openSupplierMenu, setOpenSupplierMenu] = useState(
    location.pathname.includes("/suppliers")
  );

  // Configuration dropdown
  const [openConfigurationMenu, setOpenConfigurationMenu] = useState(
    location.pathname.includes("/configuration")
  );

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSupplierToggle = () => {
    setOpenSupplierMenu(!openSupplierMenu);
  };

  const handleConfigurationToggle = () => {
    setOpenConfigurationMenu(!openConfigurationMenu);
  };

  return (
    <Box
      width={collapsed ? 72 : 240}
      transition="width 0.25s ease"
      bgcolor="#ffffff"
      borderRight="1px solid #e0e0e0"
      p={collapsed ? 1 : 2}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* TOP SECTION */}
      <Box>
        {/* LOGO */}
        <Box
          mb={3}
          display="flex"
          alignItems="center"
          justifyContent={collapsed ? "center" : "flex-start"}
          gap={2}
        >
          <Box
            component="img"
            src={AnapLogo}
            alt="Anap"
            sx={{
              width: collapsed ? 40 : 52,
              height: collapsed ? 40 : 52,
              objectFit: "contain",
            }}
          />

          {!collapsed && (
            <Box>
              <Typography fontSize={18} fontWeight={700}>
                Anap
              </Typography>
              <Typography fontSize={13} color="text.secondary">
                Wholesale Management
              </Typography>
            </Box>
          )}
        </Box>

        {/* SIDEBAR MENU */}
        <List sx={{ width: "100%" }}>
          {/* Dashboard */}
          <ListItemButton
            component={Link}
            to="/"
            selected={location.pathname === "/"}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <DashboardIcon />
            </ListItemIcon>

            {!collapsed && (
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{
                  fontSize: 16,
                  fontWeight: 500,
                }}
              />
            )}
          </ListItemButton>

          {/* Supplier Dropdown */}
          <ListItemButton
            onClick={handleSupplierToggle}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LocalShippingIcon />
            </ListItemIcon>

            {!collapsed && (
              <>
                <ListItemText
                  primary="Suppliers"
                  primaryTypographyProps={{
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                />

                {openSupplierMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </>
            )}
          </ListItemButton>

          <Collapse in={openSupplierMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Supplier List */}
              <ListItemButton
                component={Link}
                to="/suppliers"
                selected={location.pathname === "/suppliers"}
                sx={{
                  pl: 5,
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <ListAltIcon fontSize="small" />
                </ListItemIcon>

                {!collapsed && (
                  <ListItemText
                    primary="Supplier List"
                    primaryTypographyProps={{
                      fontSize: 15,
                    }}
                  />
                )}
              </ListItemButton>
            </List>
          </Collapse>

          {/* Configuration Dropdown */}
          <ListItemButton
            onClick={handleConfigurationToggle}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>

            {!collapsed && (
              <>
                <ListItemText
                  primary="Configuration"
                  primaryTypographyProps={{
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                />

                {openConfigurationMenu ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </>
            )}
          </ListItemButton>

          <Collapse in={openConfigurationMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* User Role Mapping */}
              <ListItemButton
                component={Link}
                to="/configuration/user-role-mapping"
                selected={location.pathname.includes(
                  "/configuration/user-role-mapping",
                )}
                sx={{
                  pl: 5,
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <PeopleAltIcon fontSize="small" />
                </ListItemIcon>

                {!collapsed && (
                  <ListItemText
                    primary="User Role Mapping"
                    primaryTypographyProps={{
                      fontSize: 15,
                    }}
                  />
                )}
              </ListItemButton>
            </List>
          </Collapse>

          {/* Retailers */}
          <ListItemButton
            component={Link}
            to="/retailers"
            selected={location.pathname === "/retailers"}
            sx={{ borderRadius: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LocalConvenienceStoreIcon />
            </ListItemIcon>

            {!collapsed && (
              <ListItemText
                primary="Retailers"
                primaryTypographyProps={{
                  fontSize: 16,
                  fontWeight: 500,
                }}
              />
            )}
          </ListItemButton>
        </List>
      </Box>

      {/* BOTTOM USER PROFILE */}
      <Box>
        <Divider sx={{ mb: 1 }} />

        <Box
          display="flex"
          alignItems="center"
          justifyContent={collapsed ? "center" : "space-between"}
          px={1}
          py={1}
          borderRadius={2}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
          onClick={handleUserClick}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar sx={{ width: 36, height: 36 }}>A</Avatar>

            {!collapsed && (
              <Box>
                <Typography fontSize={14} fontWeight={600}>
                  {loggedUser?.fullName || loggedUser?.username || "Guest"}
                </Typography>

                <Typography fontSize={12} color="text.secondary">
                  {loggedUser?.role || "USER"}
                </Typography>
              </Box>
            )}
          </Box>

          {!collapsed && (
            <IconButton size="small">
              <ExpandMoreIcon />
            </IconButton>
          )}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/profile");
            }}
          >
            Profile
          </MenuItem>

          <MenuItem
            onClick={() => {
              localStorage.removeItem("loggedInUser");
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}