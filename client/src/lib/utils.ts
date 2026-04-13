export const getAvatar = (
  avatar: string | null | undefined,
  username: string
): string => {
  if (avatar && avatar.trim() !== '') return avatar
  return `https://api.dicebear.com/7.x/initials/svg?seed=${username}`
}
