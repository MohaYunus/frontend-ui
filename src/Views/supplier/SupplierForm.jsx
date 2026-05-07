import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

const initialFormState = {
  name: "",
  contactPerson: "",
  phone: "",
  gstNumber: "",
};

export default function SupplierForm({ open, onClose, onSave, data, loading }) {
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (data) {
      setForm({
        name: data.COMPANY_NAME || "",
        contactPerson: data.CONTACT_NAME || "",
        phone: data.PHONE_NUMBER || "",
        gstNumber: data.GST_NUMBER || "",
      });
    } else {
      setForm(initialFormState);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{data ? "Edit Supplier" : "Add Supplier"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Company Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Contact Person"
            name="contactPerson"
            value={form.contactPerson}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="GST Number"
            name="gstNumber"
            value={form.gstNumber}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
