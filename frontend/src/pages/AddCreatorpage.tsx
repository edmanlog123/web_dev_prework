import { useMutation } from "@apollo/client";
import { CREATE_CREATOR } from "../graphql/mutations/creator.mutation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AddCreatorpage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    bio: "",
    image: ""
  });

  const [createCreator, { loading }] = useMutation(CREATE_CREATOR, {
    onCompleted: () => {
      toast.success("Creator added!");
      navigate("/creators");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add creator");
    },
    refetchQueries: ["AllCreators"]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCreator({ variables: { input: form } });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Add New Creator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Creator Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Creator"}
        </button>
      </form>
    </div>
  );
}
