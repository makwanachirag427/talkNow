import { Eye, EyeOff, KeyRound, Mail, MessageSquare, User } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { type SignUpFormData } from "../types";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    fullName: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): string | true => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be atleast 6 characters long");

    return true;
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) {
      signup(formData);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 sm:bg-base-100/80 sm:p-25 flex justify-center mt-10 sm:mt-0">
      <div className="w-full sm:max-w-lg bg-base-200  mx-auto  h-full p-4 py-12 rounded-xl">
        {/* heading  */}
        <div className="flex flex-col gap-1 justify-center items-center">
          <div className="p-3 bg-primary/10 rounded-lg animate-pulse transition-colors mb-2">
            <MessageSquare className="text-primary" />
          </div>
          <span className="text-2xl font-bold">Create Your Account</span>
          <span className="text-base-content">
            Join our community and start chatting!
          </span>
        </div>
        {/* form  */}
        <form
          className="mt-5 flex justify-center items-center max-w-[80vw] mx-auto sm:px-15 sm:w-full"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col gap-6 w-full">
            <label className="input w-full bg-transparent ">
              <User className="text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleFormChange}
              />
            </label>
            <label className="input w-full bg-transparent">
              <Mail className="text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </label>
            <label className="input w-full bg-transparent">
              <KeyRound className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
              />
              <div className="" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className="size-5 text-gray-400" />
                ) : (
                  <Eye className="size-5 text-gray-400" />
                )}
              </div>
            </label>
            <button type="submit" className="btn btn-primary font-semibold">
              {isSigningUp? "Loading..." : "Sign up"}
            </button>
          </div>
        </form>

        <div className="mt-10 flex justify-center">
          Already have an account?{" "}
          <Link to={"/login"} className="ml-2 text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
