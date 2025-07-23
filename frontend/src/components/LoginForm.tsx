import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations/user.mutation.ts"; // adjust the path if needed
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFormState } from "react-dom";


interface LoginData {
	username: string;
	password: string;
}

export default function LoginForm() {
  const [loginData, setLoginData] = useState<LoginData>({
		username: "",
		password: "",
	});

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    refetchQueries: ["GetAuthenticatedUser"],
  });


  const navigate = useNavigate();

// Then your submit handler:

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setLoginData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const { data } = await login({
      variables: {
        input: loginData, 
        }// assumes your state is called loginData
      },
    );

    if (data?.login) {
      toast.success("Login successful!");
      navigate("/homepage");
    } else {
      toast.error("Invalid credentials.");
    }
  } catch (error: any) {
    console.error("Login error:", error);
    toast.error(error.message || "Login failed.");
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Username or Email"
        value={loginData.username}
        onChange={handleChange}
        name="username"
        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={loginData.password}
        onChange={handleChange}
        name="password"
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
