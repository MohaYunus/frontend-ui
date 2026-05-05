export const getDefaultTableStyles = () => ({
  paper: {
    borderRadius: 3,
    overflow: "hidden",
  },

  headerCell: {
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    userSelect: "none",
  },

  headerRow: {
    backgroundColor: "#fafafa",
  },

  rowHover: {
    "&:hover": {
      backgroundColor: "#fafafa",
    },
  },

  addButton: {
    borderRadius: 2,
    textTransform: "none",
    fontWeight: 600,
  },

  searchField: {
    width: 320,
  },
});

export const getStatusColor = (status) => {
  if (status === "ACTIVE") return "success";
  if (status === "INACTIVE") return "error";
  return "default";
};
