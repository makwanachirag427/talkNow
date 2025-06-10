import { Image, Send, X } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/chatStore";

const MessageInput = () => {
  const [text, setText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<null | string>(null);
  const fileInputRef = useRef<null | HTMLInputElement>(null);

  const { sendMessage } = useChatStore();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;
    try {
      sendMessage({
        text: text.trim(),
        image: imagePreview as string,
      });

      //   clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Error while sending the message ", error);
    }
  };
  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              type="button"
              className="absolute btn btn-circle -top-1.5 -right-1.5 size-5"
              onClick={removeImage}
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleFormSubmit} className="flex gap-2 items-center">
        <div className="flex-1 flex gap-2 items-center">
          <input
            type="text"
            name="text"
            value={text}
            className="input w-full input-sm sm:input-md rounded-lg"
            placeholder="Type a message..."
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`btn btn-sm sm:btn-md btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm sm:btn-md btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
