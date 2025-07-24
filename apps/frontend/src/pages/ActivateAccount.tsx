import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActivateAccount: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!token) return;

    axios
      .put(`${import.meta.env.VITE_BASE_URL}/users/activate/${token}`)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <div className="container mt-5 text-center" style={{ maxWidth: "500px" }}>
      <h3 className="text-black fw-bold mb-3">Account Activation</h3>
      {status === "success" ? (
        <div className="alert alert-success">
          Your account has been activated!
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
