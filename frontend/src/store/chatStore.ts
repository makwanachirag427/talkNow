import { create } from "zustand";
import { type chatState } from "../types";
import { axiosInstance } from "../lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./authStore";

export const useChatStore = create<chatState>((set, get) => ({
  users: [],
  messages: [],
  isUsersLoading: false,
  isMessagesLoading: false,
  selectedUser: null,

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.log("Error in getUsers method", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (id) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${id}`);
      set({ messages: res.data });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.log("Error in getMessages method", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (data) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        data
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.log("Error in getMessages method", error);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;

      const existing = get().messages.some((msg) => msg._id === newMessage._id);
      if (existing) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },
}));
