import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id?: string;
  username: string;
  password: string;
  role: "admin" | "user";
}

const AdminUserManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({
    username: "",
    password: "",
    role: "user",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/users`, form);
      setForm({ username: "", password: "", role: "user" });
      fetchUsers();
      alert("User created successfully!");
    } catch (err) {
      console.error("User creation failed", err);
      alert("Failed to create user");
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        paddingLeft: "120px",
      }}
    >
      <div className="row">
        <div className="col-md-6">
          <h3 style={{ color: "orange" }}>Create New User</h3>
          <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
            <div className="mb-3">
              <label className="form-label text-white">Username</label>
              <input
                type="text"
                name="username"
                className="form-control border-2"
                value={form.username}
                onChange={handleChange}
                required
                style={{ borderColor: "cadetblue" }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Password</label>
              <input
                type="password"
                name="password"
                className="form-control border-2"
                value={form.password}
                onChange={handleChange}
                required
                style={{ borderColor: "cadetblue" }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Role</label>
              <select
                name="role"
                className="form-select border-2"
                value={form.role}
                onChange={handleChange}
                style={{ borderColor: "cadetblue" }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "orange", color: "black" }}
            >
              ➕ Create User
            </button>
          </form>
        </div>

        <div className="col-md-6 mt-5 mt-md-0">
          <h3 style={{ color: "cadetblue" }}>Current Users</h3>
          <table className="table table-bordered table-dark table-hover mt-3">
            <thead
              className="text-black"
              style={{ backgroundColor: "cadetblue" }}
            >
              <tr>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.username}</td>
                    <td>{u.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center text-muted py-3">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManager;
