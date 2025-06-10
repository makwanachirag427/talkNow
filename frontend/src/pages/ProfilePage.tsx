import { useState, type ChangeEvent } from "react";
import { useAuthStore } from "../store/authStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
      updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="px-4 py-8 ">
        <div className=" bg-base-300 max-w-2xl p-6 mx-auto space-y-8 rounded-xl">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Profile</h2>
            <p className="mt-2">Your Profile Information</p>
          </div>

          {/* profile picture upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt=""
                className="size-32 rounded-full border-4 object-cover"
              />
              <label
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
                htmlFor="avatar-upload"
              >
                <Camera className="size-5 text-base-200" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="avatar-upload"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* profile info  */}
          <div className="space-y-6">
            <div className="flex flex-col gap-2 ">
              <div className="flex items-center gap-2">
                <User className="size-4 text-zinc-400" />
                <span className="text-zinc-400 text-sm">Full Name</span>
              </div>
              <div className="rounded-lg border p-2.5 bg-base-200">
                {authUser?.fullName}
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-zinc-400" />
                <span className="text-zinc-400 text-sm">Email Address</span>
              </div>
              <div className="rounded-lg border p-2.5 bg-base-200">
                {authUser?.email}
              </div>
            </div>
          </div>

          {/* account-inforamtion  */}

          <div className="space-y-1.5 p-8">
            <h2 className="font-semibold text-lg ">Account Information</h2>
            <div className="flex justify-between mt-4 border-b py-2 border-zinc-700">
              <p className="text-sm">Member Since</p>
              <span className="text-sm">
                {authUser?.createdAt.split("T")[0]}
              </span>
            </div>
            <div className="flex justify-between mt-4 ">
              <p className="text-sm">Account Status</p>
              <span className="text-sm text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
