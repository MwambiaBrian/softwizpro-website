// src/pages/Login.tsx

import AuthForm from "../components/AuthForm";
import { login } from "../api/auth";
import { useAuth } from "../contexts/UserContext"; // assuming you created this

export default function Login() {
  const { loginUser } = useAuth(); // function to update user state

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await login(username, password); // backend call
      localStorage.setItem("token", response.access_token);
      console.log(response);
      loginUser(username, response.role); // update context if needed
      alert("Login successful");
    } catch (err) {
      alert("Login failed");
    }
  };

  return <AuthForm onSubmit={handleLogin} />;
}
