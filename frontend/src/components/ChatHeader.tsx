import { X } from "lucide-react";
import { useChatStore } from "../store/chatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex justify-between items-center ">
        <div className="flex gap-3 items-center">
          {/* avatar  */}

          <img
            src={selectedUser?.profilePic || "/avatar.png"}
            alt={selectedUser?.fullName}
            className="rounded-full size-10 object-cover"
          />

          {/* profile info  */}
          <div className="flex flex-col">
            <p className="font-semibold">{selectedUser?.fullName}</p>
            <p className="text-base-content/50 text-sm">Offline</p>
          </div>
        </div>

        <button>
          <X onClick={() => setSelectedUser(null)} />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
