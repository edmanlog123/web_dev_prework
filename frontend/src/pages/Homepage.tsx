import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { toast } from "react-hot-toast";
import { ALL_CREATORS } from "../graphql/queries/creator.query";
import CreatorCard from "../components/CreatorCard";
import { useState, useEffect } from "react";
import type { Creator } from "../types/types";

import EditCreatorModal from "../components/EditCreatorModal";

export default function HomePage() {
  const [editingCreator, setEditingCreator] = useState<Creator | null>(null);
  
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
      <EditCreatorModal
        creator={editingCreator}
        onClose={() => setEditingCreator(null)}
      />
    )}
    </div>
  );
}
