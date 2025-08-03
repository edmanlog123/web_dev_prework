import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { toast } from "react-hot-toast";
import { ALL_CREATORS } from "../graphql/queries/creator.query";
import CreatorCard from "../components/CreatorCard";
import { useState, useEffect } from "react";
import type { Creator } from "../types/types";
import { useMutation } from "@apollo/client";
import { UPDATE_CREATOR } from "../graphql/mutations/creator.mutation";

export default function HomePage() {
  const [editingCreator, setEditingCreator] = useState<Creator | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: "",
    links: [] as { type: string; url: string }[],
  });

  const [updateCreator] = useMutation(UPDATE_CREATOR, {
    onCompleted: () => {
      toast.success("Creator updated!");
      setEditingCreator(null); // close modal
    },
    onError: (err) => {
      toast.error("Update failed: " + err.message);
    },
    refetchQueries: [ALL_CREATORS], // optional but good UX
  });
  
  useEffect(() => {
    if (editingCreator) {
      setFormData({
        name: editingCreator.name,
        bio: editingCreator.bio,
        image: editingCreator.image,
        links: editingCreator.links || [],
      });
    }
  }, [editingCreator]);

  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);
  const {
    data: creatorsData,
    loading: creatorsLoading,
    error: creatorsError,
  } = useQuery(ALL_CREATORS);

  if (creatorsLoading) return <p>Loading creators...</p>;
  if (creatorsError) {
    toast.error("Failed to fetch creators");
    return <p>Error: {creatorsError.message}</p>;
  }

  if (loading) return <p>Loading user...</p>;
  if (error) {
    toast.error("Failed to fetch user info");
    return <p>Error: {error.message}</p>;
  }

  const user = data?.authUser;
  const allCreators = creatorsData?.allCreators || [];

  const latestCreators = [...allCreators]
    .sort((a, b) => b._id.localeCompare(a._id))
    .slice(0, 5);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {latestCreators.map((creator) => (
          <CreatorCard
            key={creator._id}
            name={creator.name}
            bio={creator.bio}
            image={creator.image}
            onEdit={() => setEditingCreator(creator)}
          />
        ))}
      </div>

      {editingCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-30">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Creator</h2>
              <button
                onClick={() => setEditingCreator(null)}
                className="text-gray-600 hover:text-black text-xl"
              >
                &times;
              </button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault(); // stops page reload
                if (!editingCreator) return;
                
                const cleanedLinks = formData.links.map(({ type, url }) => ({ type, url }));

                updateCreator({
                  variables: {
                    creatorId: editingCreator._id,
                    input: {
                      name: formData.name,
                      bio: formData.bio,
                      image: formData.image,
                      links: cleanedLinks,
                    },
                  },
                });
              }}
            >

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Creator Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  rows={3}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Links
                </label>
                {formData.links.map((link, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <select
                      className="w-1/3 border border-gray-300 rounded-md p-2"
                      value={link.type}
                      onChange={(e) => {
                        const newLinks = [...formData.links];
                        newLinks[index].type = e.target.value;
                        setFormData({ ...formData, links: newLinks });
                      }}
                    >
                      <option value="YouTube">YouTube</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Instagram">Instagram</option>
                    </select>
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-md p-2"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...formData.links];
                        newLinks[index].url = e.target.value;
                        setFormData({ ...formData, links: newLinks });
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between gap-2">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => {}} // to be hooked to delete
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
