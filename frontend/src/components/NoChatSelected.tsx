import { MessageSquare } from "lucide-react"

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-col flex-1 bg-base-100/50 justify-center items-center">
        <div className="p-3">
          <MessageSquare  className="text-primary size-12 animate-bounce"/>
        </div>
        <h2 className="text-2xl font-bold">Welcome to TalkNow</h2>
        <p className="px-10 mt-5 text-center text-base-content/60">Select a conversation from the sidebar to start chatting</p>
    </div>
  )
}
export default NoChatSelected