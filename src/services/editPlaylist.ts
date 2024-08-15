import request from "../config/request";

export const changePlaylistDetails = async (
  playlistId: string,
  name: string
) => {
  const result = await request.put(`v1/playlists/${playlistId}`, { name });
  return result.data;
};

const resizeAndCompressImage = (file: File, maxWidth: number, maxHeight: number, quality: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const elem = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
  
          elem.width = width;
          elem.height = height;
  
          const ctx = elem.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
  
          const base64String = elem.toDataURL('image/jpeg', quality);
          resolve(base64String);
        };
        img.onerror = error => reject(error);
      };
      reader.onerror = error => reject(error);
    });
  };
  
  export const uploadCustomPlaylistCover = async (playlistId: string, file: File) => {
    try {
      // Resize và nén ảnh
      const base64Image = await resizeAndCompressImage(file, 800, 800, 0.7);
  
      // Loại bỏ phần "data:image/jpeg;base64," từ chuỗi base64
      const base64ImageContent = base64Image.split(',')[1];
  
      // Kiểm tra kích thước
      const sizeInBytes = (base64ImageContent.length * 3) / 4;
      const sizeInKB = sizeInBytes / 1024;
  
      if (sizeInKB > 256) {
        throw new Error('Image size exceeds 256 KB limit');
      }
  
      const result = await request.put(
        `v1/playlists/${playlistId}/images`,
        base64ImageContent,
        {
          headers: {
            'Content-Type': 'image/jpeg'
          }
        }
      );
  
      return result.data;
    } catch (error) {
      console.error('Error uploading playlist cover:', error);
      throw error;
    }
  };