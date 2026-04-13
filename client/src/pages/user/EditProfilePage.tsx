import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useAuthStore } from "../../api/auth.api";
import { useUpdateProfile } from "../../hooks/useUser";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  bio: z.string().max(200, "Bio must be under 200 characters").optional(),
  avatar: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        bio: user.bio ?? "",
        avatar: user.avatar ?? undefined,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: FormData) => {
    updateProfile(data, {
      onSuccess: (updatedUser) => {
        toast.success("Profile updated!");
        navigate(`/u/${updatedUser.username}`);
      },
      onError: () => {
        toast.error("Failed to update profile.");
      },
    });
  };

  if (!user)
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Not logged in.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit profile
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Update your public profile information
          </p>
        </div>

        {/* Avatar preview */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src={
              user.avatar ??
              `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`
            }
            alt={user.username}
            className="w-16 h-16 rounded-full object-cover border border-gray-200 dark:border-gray-700"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user.username}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Avatar URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Avatar URL
            </label>
            <input
              {...register("avatar")}
              placeholder="https://example.com/avatar.jpg"
              className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
            {errors.avatar && (
              <p className="text-red-500 text-xs mt-1">
                {errors.avatar.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              {...register("username")}
              placeholder="yourname"
              className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              {...register("bio")}
              rows={4}
              placeholder="Tell people about yourself..."
              className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white resize-none"
            />
            {errors.bio && (
              <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              {isPending ? "Saving..." : "Save changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white text-center sm:text-left transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
