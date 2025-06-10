import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/chatStore";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div
      className={`sm:pt-20 flex  h-screen sm:bg-base-200 ${selectedUser === null ? "pt-16": "pt-0"} `}
    >
      <div className="bg-base-100 w-full h-full sm:w-[90vw] sm:h-[calc(100vh-8rem)] sm:shadow-xl sm:rounded-lg sm:max-w-6xl sm:mx-auto overflow-hidden sm:overflow-auto">
        <div className="sm:hidden w-full h-full">
          {!selectedUser ? <Sidebar /> : <ChatContainer />}
        </div>
        <div className="hidden sm:flex w-full h-full">
          <Sidebar />
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
