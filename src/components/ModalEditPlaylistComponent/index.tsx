import React, { useState } from "react";
import { Modal, Input, Button, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import {
  changePlaylistDetails,
  uploadCustomPlaylistCover,
} from "../../services/editPlaylist";
import "./index.css";
import { useParams } from "react-router-dom";
import {
  getPlaylistTracks,
  PlaylistTracksResponse,
} from "../../services/playlistDetails";
import CardXL from "../CardXL";

interface EditPlaylistModalProps {
  visible: boolean;
  onClose: () => void;
  playlistId: string;
  currentName: string;
  currentImage: string;
}

const EditPlaylistModal: React.FC<EditPlaylistModalProps> = ({
  visible,
  onClose,
  playlistId,
  currentName,
  currentImage,
}) => {
  const [name, setName] = useState(currentName);
  const [image, setImage] = useState<File | null>(null);

  const changeDetailsMutation = useMutation({
    mutationFn: (newName: string) => changePlaylistDetails(playlistId, newName),
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: "Playlist name updated successfully.",
      });
      onClose();
    },
    onError: (error: any) => {
        if (error.response && error.response.status === 403) {
          notification.error({
            message: "Forbidden",
            description: "Đéo đổi được đâu đây không phải playlist của mày",
          });
        } else {
          notification.error({
            message: "Error",
            description: "Failed to update playlist name.",
          });
        }
      },
  });

  const uploadCoverMutation = useMutation({
    mutationFn: (file: File) => uploadCustomPlaylistCover(playlistId, file),
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: "Playlist cover updated successfully.",
      });
      onClose();
    },
    onError: (error: any) => {
        if (error.response && error.response.status === 403) {
          notification.error({
            message: "Forbidden",
            description: "Đéo đổi được đâu đây không phải playlist của mày",
          });
        } else {
          notification.error({
            message: "Error",
            description: "Failed to update playlist name.",
          });
        }
      },
  });

  const handleOk = () => {
    if (name !== currentName) {
      changeDetailsMutation.mutate(name);
    }
    if (image) {
      uploadCoverMutation.mutate(image);
    }
  };

  const { data: playlistTracks, refetch } = useQuery<
    PlaylistTracksResponse,
    Error
  >(["playlistTracks", playlistId], () => getPlaylistTracks(playlistId!), {
    enabled: !!playlistId,
  });

  return (
    <Modal
      title="Edit details"
      visible={visible}
      onCancel={onClose}
      onOk={handleOk}
      okText="Save"
      className="modalEdit"
    >
      <div style={{ display: "flex" }}>
        <div style={{ marginBottom: "16px", flexBasis: "30%" }}>
          <Upload
            beforeUpload={(file) => {
              setImage(file);
              return false;
            }}
            showUploadList={false}
          >
            <CardXL
              cover={
                playlistTracks?.images && playlistTracks?.images?.length > 0 ? (
                  <img
                    src={playlistTracks?.images[0]?.url}
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "cover",
                      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.7)",
                    }}
                  />
                ) : (
                  <img
                    src={
                      "https://lastfm.freetls.fastly.net/i/u/300x300/6d4109c4072cc6d0f7905d1825dfd6b6.jpg"
                    }
                  />
                )
              }
            />
          </Upload>
          {image && (
            <div style={{ marginTop: "8px" }}>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <div style={{ marginBottom: "16px", backgroundColor: "#282828", flexBasis: "70%", marginLeft: "8px" }}>
          <div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ backgroundColor: "#3E3E3E", color: "white", height: "45px" }}
            />
          </div>
          <div style={{marginTop: "10px"}}>
            <Input style={{ backgroundColor: "#3E3E3E", color: "white", height:"124px" }} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditPlaylistModal;
