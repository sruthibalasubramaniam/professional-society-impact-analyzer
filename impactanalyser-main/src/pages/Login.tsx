import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save JWT
      localStorage.setItem("token", data.access_token);

      // Redirect to dashboard
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <form
        onSubmit={handleLogin}
        className="bg-card p-8 rounded-xl shadow-lg w-full max-w-md space-y-4 border"
      >
        <h2 className="text-2xl font-heading font-bold text-center">
          Impact Analyser Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
