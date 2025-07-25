import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ActivateAccount: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!token) return;

    axios
      .put(`${import.meta.env.VITE_BASE_URL}/users/activate/${token}`)
      .then(() => {
        setStatus("success");
        // Redirect to reset password page after 2 seconds
        setTimeout(() => {
          navigate(`/request-reset`);
        }, 2000);
      })
      .catch(() => setStatus("error"));
  }, [token, navigate]);

  return (
    <div className="container mt-5 text-center" style={{ maxWidth: "500px" }}>
      <h3 className="text-black fw-bold mb-3">Account Activation</h3>
      {status === "success" ? (
        <div className="alert alert-success">
          Your account has been activated! Redirecting to password reset...
        </div>
      ) : status === "error" ? (
        <div className="alert alert-danger">Invalid or expired token.</div>
      ) : (
        <div className="text-muted">Activating...</div>
      )}
    </div>
  );
};

export default ActivateAccount;
