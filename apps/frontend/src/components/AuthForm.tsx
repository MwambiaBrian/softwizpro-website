// src/components/AuthForm.tsx
import { useState } from "react";

type Props = {
  isRegister?: boolean;
  onSubmit: (username: string, password: string) => void;
};

export default function AuthForm({ onSubmit, isRegister = false }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mt-5 p-4 border rounded bg-light shadow-sm"
      style={{ maxWidth: "400px" }}
    >
      <h2 className="mb-4 text-center">{isRegister ? "Register" : "Login"}</h2>

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

      <button type="submit" className="btn btn-primary w-100">
        {isRegister ? "Register" : "Login"}
      </button>
    </form>
  );
}
