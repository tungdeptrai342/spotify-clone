import React from 'react';
import { Menu, notification } from 'antd';
import { useMutation } from 'react-query';
import { deleteArtist, deletePlaylist, putArtist, putPlaylist } from '../../services/playlistDetails';
import { deleteAlbums, putAlbums } from '../../services/albumDetails';

interface DropdownMenuProps {
  playlistId?: string | undefined;
  isInLibrary?: boolean | undefined;
  refetch: () => void;

}

const DropdownArtist: React.FC<DropdownMenuProps> = ({ playlistId, isInLibrary, refetch }) => {
  const addMutation = useMutation({
    mutationFn: putArtist,
    onSuccess: () => {
      notification.success({
        message: 'Success',
        description: 'Added to library successfully',
      });
      refetch()
    },

    onError: (error) => {
      notification.error({
        message: 'Error',
        description: `Error adding playlist to library`,
      });
      refetch()
    },
  });

  const removeMutation = useMutation({
    mutationFn: deleteArtist,
    onSuccess: () => {
      notification.success({
        message: 'Success',
        description: 'Removed from library successfully',
      });
      refetch()

    },
    onError: (error) => {
      notification.error({
        message: 'Error',
        description: `Error removing playlist from library`,
      });
      refetch()
    },
  });

  const handleMenuClick = () => {
    if (isInLibrary) {
      removeMutation.mutate(playlistId);
    } else {
      addMutation.mutate(playlistId);
    }
  };

  const menuItems = [
    {
      label: <p style={{ color: 'white' }}>{isInLibrary ? 'Bỏ dõi nghệ sĩ' : 'Theo dõi nghệ sĩ'}</p>,
      key: '0',
      onClick: handleMenuClick,
    },
  ];

  return <Menu items={menuItems} />;
};

export default DropdownArtist;
