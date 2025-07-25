import { useQuery } from "@apollo/client";
import { ALL_CREATORS } from "../graphql/queries/creator.query";
import CreatorCard from "../components/CreatorCard";
import { toast } from "react-hot-toast";
import type { Creator } from "../types/types"

export default function Creatorspage() {
  const { data, loading, error } = useQuery(ALL_CREATORS);

  if (loading) return <p>Loading creators...</p>;
  if (error) {
    toast.error("Failed to load creators");
    return <p>Error: {error.message}</p>;
  }

  const creators = data?.allCreators || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Creators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {creators.map((creator: Creator) => (
          <CreatorCard
            key={creator._id}
            name={creator.name}
            category={creator.category}
            bio={creator.bio}
            image={creator.image}
          />
        ))}
      </div>
    </div>
  );
}
