import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { username, password });

    // TODO: Replace with GraphQL mutation
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="text"
        placeholder="Username or Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
        required
      />

      <button
        type="submit"
        className="w-full py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
      >
        Login
      </button>
    </form>
  );
}
