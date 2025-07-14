// src/pages/Login.tsx
import AuthForm from "../components/AuthForm";
import { login } from "../api/auth"; // implement this to call backend

export default function Login() {
  const handleLogin = async (username: string, password: string) => {
    try {
      console.log(username);
      const response = await login(username, password);
      localStorage.setItem("token", response.access_token);
      alert("Login successful");
      // redirect to dashboard or home
    } catch (err) {
      alert("Login failed");
    }
  };

  return <AuthForm onSubmit={handleLogin} />;
}
