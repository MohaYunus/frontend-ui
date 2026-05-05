import React from "react";
import { Box, Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

export default function Breadcrumbs({
  heading = "",
  links = [],
  showBreadcrumb = true,
  showHeading = true,
}) {
  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      {/* Breadcrumb Path */}
      {showBreadcrumb && (
        <MuiBreadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{
            mb: 1,
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#6b7280",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            <HomeIcon
              sx={{
                fontSize: 18,
                mr: 0.5,
              }}
            />
            Home
          </Link>

          {links.map((item, index) =>
            item.to ? (
              <Link
                key={index}
                to={item.to}
                style={{
                  textDecoration: "none",
                  color: "#6b7280",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {item.title}
              </Link>
            ) : (
              <Typography
                key={index}
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                {item.title}
              </Typography>
            )
          )}
        </MuiBreadcrumbs>
      )}

      {/* Page Heading */}
      {showHeading && (
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: "28px",
            color: "#111827",
          }}
        >
          {heading}
        </Typography>
      )}
    </Box>
  );
}