import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // 👈 Added Link
import { motion } from "framer-motion";

type Props = {
  isRegister?: boolean;
  onSubmit: (username: string, password: string) => void;
};

export default function AuthForm({ onSubmit, isRegister = false }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div
      className="d-flex flex-column flex-md-row align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(to right, cadetblue, black)",
        color: "white",
        padding: "2rem",
      }}
    >
      {/* Left Column: Auth Form */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="p-5 rounded shadow-lg"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#ffffff",
          color: "#000",
        }}
      >
        <h2 className="mb-4 text-center" style={{ color: "cadetblue" }}>
          {isRegister ? "Create Your Account" : "Login"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              className="form-control"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              className="form-control"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "orange",
              color: "black",
              fontWeight: 600,
              border: "none",
            }}
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {/* 👉 Toggle Link Below Form */}
        <div className="mt-3 text-center">
          {isRegister ? (
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "cadetblue", fontWeight: "bold" }}
              >
                Login
              </Link>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <Link
                to="/register"
                style={{ color: "cadetblue", fontWeight: "bold" }}
              >
                Register
              </Link>
            </p>
          )}
        </div>
      </motion.div>

      {/* Right Column: Branding */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="ms-md-5 mt-5 mt-md-0 text-center text-md-start"
      >
        <h1 style={{ color: "orange", fontWeight: "bold" }}>
          Empowering Ideas with Code
        </h1>
        <p style={{ maxWidth: "500px", color: "white", fontSize: "1.1rem" }}>
          Join our platform and collaborate with the most innovative software
          development company. We build secure, scalable, and custom digital
          products.
        </p>
        <img
          src="https://th.bing.com/th/id/R.949d673de7c6d31b9b02e7d51d46ddf9?rik=kG9dp3tN3fvXmQ&riu=http%3a%2f%2fwww.pinnacletechdd.com%2fwp-content%2fuploads%2f2019%2f10%2fheartland-restaurant_products.png&ehk=xSi0OU9Kj9y9FwCkid%2f%2ffBuCM0ndv4rLCpbHW0o%2bmHc%3d&risl=&pid=ImgRaw&r=0"
          alt="Software Dev"
          className="img-fluid rounded shadow mt-3"
        />
      </motion.div>
    </div>
  );
}
