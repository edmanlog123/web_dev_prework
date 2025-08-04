import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CREATOR } from "../graphql/mutations/creator.mutation";
import { DELETE_CREATOR } from "../graphql/mutations/creator.mutation";
import { ALL_CREATORS } from "../graphql/queries/creator.query";
import { toast } from "react-hot-toast";
import type { Creator } from "../types/types";

type Props = {
  creator: Creator;
  onClose: () => void;
};

export default function EditCreatorModal({ creator, onClose }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: "",
    links: [] as { type: string; url: string }[],
  });

  useEffect(() => {
    setFormData({
      name: creator.name,
      bio: creator.bio,
      image: creator.image,
      links: creator.links || [],
    });
  }, [creator]);

  const [updateCreator] = useMutation(UPDATE_CREATOR, {
    onCompleted: () => {
      toast.success("Creator updated!");
      onClose();
    },
    onError: (err) => {
      toast.error("Update failed: " + err.message);
    },
    refetchQueries: [ALL_CREATORS],
  });

  const [deleteCreator] = useMutation(DELETE_CREATOR, {
    onCompleted: () => {
      toast.success("Creator deleted!");
      onClose();
    },
    onError: (err) => {
      toast.error("Delete failed: " + err.message);
    },
    refetchQueries: [ALL_CREATORS],
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-30">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Creator</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const cleanedLinks = formData.links.map(({ type, url }) => ({
              type,
              url,
            }));

            updateCreator({
              variables: {
                creatorId: creator._id,
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
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md transition"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md"
              onClick={() => {
                const confirmDelete = window.confirm("Are you sure you want to delete this creator?");
                if (!confirmDelete) return;

                deleteCreator({
                    variables: {
                    creatorId: creator._id,
                    },
                });
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
