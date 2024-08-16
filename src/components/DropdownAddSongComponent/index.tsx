import React from "react";
import { Menu, notification } from "antd";
import { useMutation, useQuery } from "react-query";
import {
  getUserPlaylists,
  PlaylistsResponse,
  postItemPlaylist,
} from "../../services/playlist";

interface DropdownMenuProps {
  trackUri: string;
  refetch: () => void;
}

const userId = "31kgeh75edzsu6zoftj3lwpiq4ye";

const DropdownAddSong: React.FC<DropdownMenuProps> = ({
  trackUri,
  refetch,
}) => {
  const { data: playlistTracks } = useQuery<PlaylistsResponse, Error>(
    ["playlistTracks", userId],
    () => getUserPlaylists(userId),
    { enabled: !!userId }
  );

  const addMutation = useMutation({
    mutationFn: (playlist_id: string) =>
      postItemPlaylist(playlist_id, [trackUri]),
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: "Added song to playlist successfully",
      });
      refetch();
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Error adding song to playlist",
      });
    },
  });

  const handleAdd = (playlistId: string) => {
    addMutation.mutate(playlistId);
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
  ];

  return <Menu items={menuItems} />;
};

export default DropdownAddSong;
