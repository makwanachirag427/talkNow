import type { Socket } from "socket.io-client";

export interface LogInFormData {
    email: string;
    password: string;
}

export interface SignUpFormData {
    email: string;
    fullName: string;
    password: string;
}

export interface User {
    _id: string,
    fullName: string;
    email: string;
    profilePic: string;
    createdAt: string;
}

export interface authState {
    authUser: User | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isCheckingAuth: boolean;
    isUpdatingProfile: boolean;
    onlineUsers: string[];
    socket: null | Socket;
    updateProfile: (data: { profilePic: string }) => void;
    checkAuth: () => void;
    signup: (formData: SignUpFormData) => void;
    login: (formData: LogInFormData) => void;
    logout: () => void;
    connectSocket: () => void;
    disconnectSocket: () => void;
}

export interface themeState {
    theme: string;
    setTheme: (theme: string) => void;
}

export interface message {
    _id: string,
    senderId: string;
    receiverId: string;
    text?: string;
    image?: string;
    createdAt: string;
}

export interface chatState {
    users: User[];
    messages: message[];
    selectedUser: User | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
    getUsers: () => void;
    getMessages: (id: string | undefined) => void;
    sendMessage: (data: { text?: string, image?: string }) => void;
    setSelectedUser: (selectedUser: User | null) => void;
    subscribeToMessages: () => void;
    unsubscribeToMessages: () => void;
}