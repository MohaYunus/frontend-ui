

import React from "react";
import { Snackbar, Alert } from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const iconMap = {
  success: <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />,
  error: <ErrorOutlineIcon sx={{ fontSize: 18 }} />,
  warning: <WarningAmberOutlinedIcon sx={{ fontSize: 18 }} />,
  info: <InfoOutlinedIcon sx={{ fontSize: 18 }} />,
};

const bgColorMap = {
  success: "#52c41a",
  error: "#ff4d4f",
  warning: "#faad14",
  info: "#1677ff",
};

export default function CommonSnackbar({
  open,
  handleClose,
  message,
  severity = "success",
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{
        top: "18px !important",
      }}
    >
      <Alert
        onClose={handleClose}
        icon={iconMap[severity]}
        severity={severity}
        sx={{
          width: "fit-content",
          minWidth: "unset",
          maxWidth: "unset",
          height: 42,
          backgroundColor: bgColorMap[severity],
          color: "#fff",
          borderRadius: "4px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.10)",
          fontWeight: 600,
          fontSize: "14px",
          px: 2,
          py: 0,
          display: "flex",
          alignItems: "center",

          "& .MuiAlert-icon": {
            color: "#fff",
            marginRight: "8px",
            padding: 0,
            display: "flex",
            alignItems: "center",
          },

          "& .MuiAlert-message": {
            padding: 0,
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
            whiteSpace: "nowrap",
          },

          "& .MuiAlert-action": {
            padding: 0,
            marginLeft: "12px",
            display: "flex",
            alignItems: "center",
          },

          "& .MuiIconButton-root": {
            padding: "4px",
          },

          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}