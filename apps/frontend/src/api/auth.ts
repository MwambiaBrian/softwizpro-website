// src/api/auth.ts
export async function register(username: string, password: string) {
  return fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((res) => {
    if (!res.ok) throw new Error("Registration failed");
    return res.json();
  });
}

export async function login(username: string, password: string) {
  return fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((res) => {
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  });
}
