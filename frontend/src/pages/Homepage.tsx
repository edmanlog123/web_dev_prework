import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { toast } from "react-hot-toast";

export default function HomePage() {
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return <p>Loading user...</p>;
  if (error) {
    toast.error("Failed to fetch user info");
    return <p>Error: {error.message}</p>;
  }

  const user = data?.authUser;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      <p>Username: {user?.username}</p>
      <p>Gender: {user?.gender}</p>
    </div>
  );
}
