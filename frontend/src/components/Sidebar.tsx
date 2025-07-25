import { PresentationChartBarIcon, PlusCircleIcon, ClipboardDocumentListIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { NavLink,Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../graphql/mutations/user.mutation";
import { toast } from "react-hot-toast";

export function DefaultSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [logout, { client }] = useMutation(LOGOUT_MUTATION, { refetchQueries: ["GetAuthenticatedUser"] });

  const handleLogout = async () => {
    try {
      await logout();
      await client.resetStore();
      navigate("/login");
    } catch (error) {
      toast.error((error as Error).message || "Logout failed");
    }
  };

  return (
    <nav className="flex flex-col h-full bg-[#000000] text-white py-8 px-4 w-64">
      <div className="mb-10 px-2">
        <span className="text-2xl font-bold tracking-tight ">CreatorVerse</span>
      </div>
      <ul className="flex-1 space-y-2">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive ? "bg-[#cccfd5]" : "hover:bg-[#eee]"
              }`
            }
          >
            <PresentationChartBarIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" className={({ isActive }) =>`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive ? "bg-[#cccfd5]" : "hover:bg-[#eee]"
              }`}>
            <PlusCircleIcon className="h-5 w-5" />
            <span>Add Creator</span>
          </NavLink>
        </li>
        <li>
        <NavLink to="/creators" className={({ isActive }) =>`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive ? "bg-[#cccfd5]" : "hover:bg-[#eee]"
              }`}>
            <ClipboardDocumentListIcon className="h-5 w-5" />
            <span>All Creators</span>
          </NavLink>
        </li>
        <li>
          <Link to="/settings" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-[#cccfd5]`}>
            <Cog6ToothIcon className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
      <div className="mt-auto">
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg w-full transition hover:bg-[#cccfd5] text-left">
          <PowerIcon className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </nav>
  );
}