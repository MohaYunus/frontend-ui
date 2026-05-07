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
  shopName: "",

  ownerName: "",

  phoneNumber: "",

  address: "",

  creditLimit: "",
};

export default function RetailerForm({
  open,

  onClose,

  onSave,

  data,

  loading,
}) {
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (data) {
      setForm({
        shopName: data.SHOP_NAME || "",

        ownerName: data.OWNER_NAME || "",

        phoneNumber: data.PHONE_NUMBER || "",

        address: data.ADDRESS || "",

        creditLimit: data.CREDIT_LIMIT || "",
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
      <DialogTitle>{data ? "Edit Retailer" : "Add Retailer"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Shop Name"
            name="shopName"
            value={form.shopName}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Owner Name"
            name="ownerName"
            value={form.ownerName}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />

          <TextField
            label="Dues"
            name="creditLimit"
            value={form.creditLimit}
            onChange={handleChange}
            fullWidth
            type="number"
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
