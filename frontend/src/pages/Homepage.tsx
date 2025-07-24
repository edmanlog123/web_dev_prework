import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { toast } from "react-hot-toast";
import { ALL_CREATORS } from "../graphql/queries/creator.query";

export default function HomePage() {
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);
  const { data: creatorsData, loading: creatorsLoading, error: creatorsError,} = useQuery(ALL_CREATORS);
  
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
  .sort((a, b) => b._id.localeCompare(a._id)) // newest first
  .slice(0, 5);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      <div className="flex space-x-4 overflow-x-auto pb-2">
    {latestCreators.map((creator) => (
      <div
        key={creator._id}
        className="min-w-[200px] bg-white border border-gray-300 rounded-lg shadow p-4"
      >
        <img
          src={creator.image}
          alt={creator.name}
          className="w-full h-32 object-cover rounded mb-2"
        />
        <h3 className="font-bold text-lg">{creator.name}</h3>
        <p className="text-sm text-gray-600">{creator.category}</p>
      </div>
    ))}
  </div>
    </div>
    
  );
}
