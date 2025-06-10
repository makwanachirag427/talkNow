import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const { selectedUser } = useChatStore();

  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 p-4 border-b border-base-300 bg-base-100  ${
        selectedUser && "hidden sm:flex"
      } `}
    >
      <div className="container sm:px-4 h-full flex justify-between items-center mx-auto">
        {/* logo */}
        <Link
          to={"/"}
          className="flex gap-2.5 items-center hover:opacity-80 transition-all"
        >
          <div className="bg-primary/10 p-2 rounded-lg">
            <MessageSquare className="text-primary size-5" />
          </div>
          <span className="font-bold text-lg">TalkNow</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to={"/settings"} className="btn btn-sm transition-colors gap-2">
            <Settings className="size-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to={"/profile"}
                className="btn btn-sm transition-colors gap-2"
              >
                <User className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <button
                className="btn btn-sm transition-colors gap-2 "
                onClick={logout}
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
