// src/pages/Register.tsx
import AuthForm from "../components/AuthForm";
import { register } from "../api/auth"; // implement this to send request to backend

export default function Register() {
  const handleRegister = async (username: string, password: string) => {
    try {
      await register(username, password);
      alert("Registration successful");
      // redirect to login or home page
    } catch (err) {
      alert("Registration failed");
    }
  };

  return <AuthForm isRegister onSubmit={handleRegister} />;
}
