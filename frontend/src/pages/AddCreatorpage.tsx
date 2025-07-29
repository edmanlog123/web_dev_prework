import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_CREATOR } from "../graphql/mutations/creator.mutation";
import { GET_CREATOR_SUGGESTION } from "../graphql/queries/creator.query";
import { ALL_CREATORS } from "../graphql/queries/creator.query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AddCreatorPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    bio: "",
    image: ""
  });

  const [links, setLinks] = useState([{ type: "", url: "" }]);
  const [searchName, setSearchName] = useState("");

  const [getSuggestion, { loading: loadingSuggestion, error: suggestionError }] = useLazyQuery(GET_CREATOR_SUGGESTION);

  const [createCreator, { loading }] = useMutation(CREATE_CREATOR, {
    onCompleted: () => {
      toast.success("Creator added!");
      navigate("/creators");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add creator");
    },
    refetchQueries: [{ query: ALL_CREATORS }]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const updated = [...links];
    updated[index][field as "type" | "url"] = value;
    setLinks(updated);
  };

  const addLink = () => {
    setLinks([...links, { type: "", url: "" }]);
  };

  const removeLink = (index: number) => {
    const updated = [...links];
    updated.splice(index, 1);
    setLinks(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedLinks = links.map(({ type, url }) => ({ type, url }));

await createCreator({
  variables: {
    input: {
      ...form,
      links: cleanedLinks,
    },
  },
});

  };

  const handleFillIn = async () => {
    const res = await getSuggestion({ variables: { name: searchName } });
    const suggestion = res.data?.getCreatorSuggestion;


    if (suggestion) {

      setForm((prev) => ({
        ...prev,
        name: searchName,
        bio: suggestion.bio,
        image: suggestion.image,
      }));
      setLinks(suggestion.links);
    } else {
      toast.error("No data returned from Gemini.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Add New Creator</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Creator"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleFillIn}
          disabled={loadingSuggestion}
          className="mt-2 bg-black text-white px-6 py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {loadingSuggestion ? "Loading..." : "Fill In"}
        </button>
        {suggestionError && (
          <p className="text-red-500 text-sm mt-1">Error fetching suggestion.</p>
        )}
      </div>

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

        <div className="space-y-3">
          <h2 className="text-sm font-medium">Links</h2>
          {links.map((link, index) => (
            <div key={index} className="flex gap-2 items-center">
              <select
                value={link.type}
                onChange={(e) => handleLinkChange(index, "type", e.target.value)}
                className="border p-2 rounded w-1/3"
                required
              >
                <option value="">Select Platform</option>
                <option value="YouTube">YouTube</option>
                <option value="Twitter">Twitter</option>
                <option value="Instagram">Instagram</option>
              </select>
              <input
                type="url"
                value={link.url}
                onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                className="border p-2 rounded flex-1"
                placeholder="https://..."
                required
              />
              <button
                type="button"
                onClick={() => removeLink(index)}
                className="text-red-500 font-bold text-xl px-2"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addLink}
            className="text-sm text-blue-600 underline"
          >
            + Add Link
          </button>
        </div>

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
