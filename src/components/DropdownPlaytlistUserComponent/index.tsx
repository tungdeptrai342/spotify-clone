import React from "react";
import { Menu, notification } from "antd";
import { useMutation, useQuery } from "react-query";
import { deleteItemPlaylist, getUserPlaylists, PlaylistsResponse, postItemPlaylist } from "../../services/playlist";

interface DropdownMenuProps {
  trackUri: string;
  refetch: () => void;
  currentPlaylistId?: string; // Added prop for the current playlist ID
}

const userId = "31kgeh75edzsu6zoftj3lwpiq4ye";

const DropdownPlaylistUser: React.FC<DropdownMenuProps> = ({ trackUri, refetch, currentPlaylistId }) => {
  const { data: playlistTracks } = useQuery<PlaylistsResponse, Error>(
    ["playlistTracks", userId],
    () => getUserPlaylists(userId),
    { enabled: !!userId }
  );

  const addMutation = useMutation({
    mutationFn: (playlist_id: string) => postItemPlaylist(playlist_id, [trackUri]),
    onSuccess: () => {
      notification.success({ message: "Success", description: "Added song to playlist successfully" });
      refetch();
    },
    onError: () => {
      notification.error({ message: "Error", description: "Error adding song to playlist" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (playlist_id: string) => deleteItemPlaylist(playlist_id, [trackUri]),
    onSuccess: () => {
      notification.success({ message: "Success", description: "Removed song from playlist successfully" });
      refetch();
    },
    onError: () => {
      notification.error({ message: "Error", description: "Error removing song from playlist" });
    },
  });

  const handleAdd = (playlistId: string) => {
    addMutation.mutate(playlistId);
  };

  const handleDelete = () => {
    if (currentPlaylistId) {
      deleteMutation.mutate(currentPlaylistId); // Use the current playlist ID
    } else if (playlistTracks?.items.length) {
      const defaultPlaylistId = playlistTracks.items[0].id;
      deleteMutation.mutate(defaultPlaylistId);
    }
  };

  const menuItems = [
    {
      label: "Thêm vào danh sách phát",
      key: "add",
      children: playlistTracks?.items.map((playlist) => ({
        label: playlist.name,
        key: `add-${playlist.id}`,
        onClick: () => handleAdd(playlist.id),
      })),
    },
    {
      label: "Xóa bài hát này khỏi danh sách phát",
      key: "delete",
      onClick: handleDelete,
    },
  ];

  return <Menu items={menuItems} />;
};

export default DropdownPlaylistUser;
