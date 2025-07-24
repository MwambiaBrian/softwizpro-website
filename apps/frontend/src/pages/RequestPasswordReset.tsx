import React, { useState } from "react";
import axios from "axios";

const RequestPasswordReset: React.FC = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleRequest = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/request-password-reset`,
        { username }
      );
      setMessage("A reset link has been sent to your email.");
    } catch {
      setMessage("Failed to send reset link.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h4 className="fw-bold text-orange mb-3">Reset Your Password</h4>
      <input
        type="email"
        className="form-control mb-3"
        placeholder="Enter your email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="btn btn-dark w-100" onClick={handleRequest}>
        Send Reset Link
      </button>
      {message && <p className="mt-3 text-success">{message}</p>}
    </div>
  );
};

export default RequestPasswordReset;
