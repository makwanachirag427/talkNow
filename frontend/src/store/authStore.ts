import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { authState } from "../types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create<authState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      console.log(res.data);
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth ", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (FormData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("auth/signup", FormData);
      set({ authUser: res.data });
      console.log(res);
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.log("Error in signup method", error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (FormData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("auth/login", FormData);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.log("Error in signup method", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.log("Error in signup method", error);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.post("auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.log("Error in updateProfile method", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser?._id,
      },
    });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
