import request from "../config/request";

export const postPlaylist = async (user_id: string) => {
  const result = await request.post(`/v1/users/${user_id}/playlists`, {
    name: "Playlist của tôi",
    description: "Play mới",
    public: true,
  });
  return result.data;
};
