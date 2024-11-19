import { Cloudinary } from "@cloudinary/url-gen";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME,
  },
});

// Upload an image with tags
const uploadImage = async (file, tags) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  if (tags && tags.length > 0) {
    formData.append("tags", tags.join(","));
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

// Search images by tag
const searchImagesByTag = async (tag) => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${API_KEY}:${API_SECRET}`)}`,
        },
        body: JSON.stringify({
          expression: `tags:${tag}`,
        }),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Search failed:", error);
    throw error;
  }
};

// Get optimized URL for an image
const getImageUrl = (publicId) => {
  return cld.image(publicId).toURL();
};

export { uploadImage, searchImagesByTag, getImageUrl, cld };
