export default function useDeleteItem(baseUrl, onSuccess) {
  const handleDelete = async (row, displayName = "record") => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${row[displayName] || "this item"}?`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${baseUrl}/${row.USER_ID || row.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.status === "S") {
        alert("Deleted successfully");
        if (onSuccess) onSuccess();
      } else {
        alert(result.message || "Delete failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return {
    handleDelete,
  };
}
