import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { toast } from "react-hot-toast";
import { ALL_CREATORS } from "../graphql/queries/creator.query";
import CreatorCard from "../components/CreatorCard";
import { useState, useEffect } from "react";
import type { Creator } from "../types/types";
import CreatorCarousel from "../components/CreatorCarousel";
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


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      <CreatorCarousel creators={allCreators} onEdit={setEditingCreator} />
      {editingCreator && (
      <EditCreatorModal
        creator={editingCreator}
        onClose={() => setEditingCreator(null)}
      />
    )}
    </div>
  );
}
