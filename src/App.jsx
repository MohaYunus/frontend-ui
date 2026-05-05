import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "./Views/dashboard/Dashboard";
import SupplierListPage from "./Views/supplier/SupplierListPage";
import RetailerListPage from "./Views/Retailer/RetailerListPage";

import LoginPage from "./Views/auth/LoginPage";
import EmailSentPage from "./Views/auth/EmailSentPage";
import ForgotPasswordPage from "./Views/auth/ForgotPasswordPage";

import UserRoleMappingListPage from "./Views/configuration/user-role-mapping/UserRoleMappingListPage";
import UserRoleMappingFormPage from "./Views/configuration/user-role-mapping/UserRoleMappingFormPage";

import ProfilePage from "./Views/auth/ProfilePage";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/email-sent" element={<EmailSentPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>

          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Profile */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Configuration */}
          <Route
            path="/configuration/user-role-mapping"
            element={<UserRoleMappingListPage />}
          />

          <Route
            path="/configuration/user-role-mapping/add"
            element={<UserRoleMappingFormPage />}
          />

          <Route
            path="/configuration/user-role-mapping/edit/:id"
            element={<UserRoleMappingFormPage />}
          />

          {/* Supplier */}
          <Route path="/suppliers" element={<SupplierListPage />} />

          {/* Retailer */}
          <Route path="/retailers" element={<RetailerListPage />} />

        </Route>
      </Route>

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;