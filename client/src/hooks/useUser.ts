import { toggleLike, toggleSave, type Post } from "../api/post.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserByUsername,
  getCurrentUser,
  toggleFollow,
  getUserPosts,
  updateCurrentUser,
  type User,
  getFollowers,
  getFollowing,
} from "../api/user.api";

export const useProfile = (username: string) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => getUserByUsername(username).then((res) => res.data),
    enabled: !!username,
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getCurrentUser().then((res) => res.data),
  });
};

export const useUserPosts = (username: string) => {
  return useQuery({
    queryKey: ["user-posts", username],
    queryFn: () => getUserPosts(username).then((res) => res.data),
    enabled: !!username,
  });
};

export const useFollowers = (username: string) => {
  return useQuery({
    queryKey: ["followers", username],
    queryFn: () => getFollowers(username).then((res) => res.data),
    enabled: !!username,
  });
};

export const useFollowing = (username: string) => {
  return useQuery({
    queryKey: ["following", username],
    queryFn: () => getFollowing(username).then((res) => res.data),
    enabled: !!username,
  });
};

export const useToggleFollow = (username: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => toggleFollow(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", username] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Pick<User, "username" | "bio" | "avatar">>) =>
      updateCurrentUser(data).then((res) => res.data),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["user", updatedUser.username] });
    },
  });
};

export const useToggleLike = (postId: number, slug: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => toggleLike(postId),
    onSuccess: () => {
      // Single post page
      queryClient.invalidateQueries({ queryKey: ["post", slug] });
      // Invalidate ALL queries that start with "posts"
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // Invalidate user posts
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
  });
};



// export const useToggleSave = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (postId: number) => toggleSave(postId),

//     // 🔥 OPTIMISTIC UPDATE
//     onMutate: async (postId: number) => {
//       await queryClient.cancelQueries({ queryKey: ["posts"] })

//       const previousPosts = queryClient.getQueryData<Post[]>(["posts"])

//       queryClient.setQueryData<Post[]>(["posts"], (old) =>
//         old?.map((p) =>
//           p.id === postId
//             ? { ...p, isSaved: !p.isSaved }
//             : p
//         )
//       )

//       return { previousPosts }
//     },

//     // ❌ rollback if error
//     onError: (_err, _postId, context) => {
//       if (context?.previousPosts) {
//         queryClient.setQueryData(["posts"], context.previousPosts)
//       }
//     },

//     // 🔄 refetch after
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["posts"] })
//     },
//   })
// }

export const useToggleSave = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: number) => toggleSave(postId),
    onMutate: async (postId: number) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['post'] })

      // Snapshot all cached post queries
      const previousData = queryClient.getQueriesData({ queryKey: ['post'] })

      // Optimistically toggle isSaved on matching post
      queryClient.setQueriesData({ queryKey: ['post'] }, (old: any) => {
        if (!old) return old
        // Handle single post object
        if (old.id === postId) {
          return { ...old, isSaved: !old.isSaved }
        }
        // Handle arrays (feeds)
        if (Array.isArray(old)) {
          return old.map((p: any) =>
            p.id === postId ? { ...p, isSaved: !p.isSaved } : p
          )
        }
        return old
      })

      return { previousData }
    },
    onError: (_err, _postId, context) => {
      // Roll back on error
      context?.previousData.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] })
    },
  })
}
