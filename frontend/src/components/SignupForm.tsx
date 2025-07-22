import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { SIGNUP_MUTATION } from "../graphql/user.mutation.ts";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

export default function SignupForm() {
  const [signupData, setSignupData] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [signup, { loading }] = useMutation(SIGNUP_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await signup({
        variables: {
          input: signupData,
        },
      });

      if (data?.signup) {
        toast.success("Signup successful!");
        navigate("/homepage");
      } else {
        toast.error("Signup failed.");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Signup failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={signupData.username}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={signupData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={signupData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
