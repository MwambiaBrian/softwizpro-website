import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/reset-password/${token}`,
        {
          newPassword,
        }
      );
      setMessage("Password reset successfully.");
    } catch {
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h4 className="text-cadetblue mb-3 fw-semibold">Create a New Password</h4>
      <input
        type="password"
        className="form-control mb-3"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button className="btn btn-warning w-100" onClick={handleReset}>
        Reset Password
      </button>
      {message && <p className="mt-3 text-success">{message}</p>}
    </div>
  );
};

export default ResetPassword;
