import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { SIGNUP_MUTATION } from "../graphql/mutations/user.mutation.ts";

interface SignupData {
  username: string;
  name: string;
  password: string;
  gender: string;
}

export default function SignupForm() {
  const [signupData, setSignupData] = useState<SignupData>({
    username: "",
    name: "",
    password: "",
    gender:""
  });

  const navigate = useNavigate();
  const [signup, { loading }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
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
        type="text"
        name="name"
        placeholder="Full Name"
        value={signupData.name}
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
      <select
        name="gender"
        value={signupData.gender}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
      >
        <option value="" disabled>
          Select Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="Other">Other</option>
      </select>
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
