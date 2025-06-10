import { Users } from "lucide-react";
import { useChatStore } from "../store/chatStore";
import { useEffect, useState } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { useAuthStore } from "../store/authStore";

const Sidebar = () => {
  const { users, getUsers, isUsersLoading, selectedUser, setSelectedUser } =
    useChatStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false);

  const { onlineUsers } = useAuthStore();

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="w-full sm:w-70  h-full  sm:border-r sm:border-base-300 flex flex-col">
      {/* sidebar header */}
      <div className="border-b border-base-300">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Users />
            <span className="font-semibold">Contacts</span>
          </div>

          {/* onlineUsers toggler  */}
          <div className="mt-3 flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              <span className="text-sm">Show online only</span>
            </label>
            <span className="text-xs text-zinc-500">
              ({onlineUsers.length - 1} online)
            </span>
          </div>
        </div>
      </div>
      {/* users*/}
      <div className="flex flex-col overflow-y-auto h-full">
        {filteredUsers.map((user) => (
          <button
            onClick={() => setSelectedUser(user)}
            key={user._id}
            className={`w-full flex p-3 gap-3 transition-colors hover:bg-primary/20  ${
              selectedUser === user
                ? "bg-primary/20   border-l-4 border-primary"
                : ""
            }`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-12 rounded-full object-cover "
              />
              {/* users is online indicator */}
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-1 right-0.5 bg-primary size-2.5 rounded-full "></span>
              )}
            </div>
            <div className="flex flex-col  items-start">
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-zinc-500 text-sm">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
