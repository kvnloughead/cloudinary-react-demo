import React, { useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import {
  uploadImage,
  searchImagesByTag,
  cld,
} from "../services/cloudinaryService";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [uploadTags, setUploadTags] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const tagArray = uploadTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const result = await uploadImage(file, tagArray);
      alert("Upload successful!");
      setFile(null);
      setUploadTags("");
    } catch (error) {
      alert("Upload failed");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTag) return;

    try {
      const result = await searchImagesByTag(searchTag);
      setImages(result.resources);
    } catch (error) {
      alert("Search failed");
    }
  };

  return (
    <div>
      {/* Upload Form */}
      <form onSubmit={handleUpload}>
        <div>
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>
        <div>
          <input
            type="text"
            value={uploadTags}
            onChange={(e) => setUploadTags(e.target.value)}
            placeholder="Add tags (comma-separated)"
          />
        </div>
        <button type="submit">Upload</button>
      </form>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          placeholder="Search by tag"
        />
        <button type="submit">Search</button>
      </form>

      {/* Image Display */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {images.map((image) => (
          <div key={image.public_id} style={{ textAlign: "center" }}>
            <AdvancedImage
              cldImg={cld
                .image(image.public_id)
                .resize(fill().width(200).height(200))}
              alt="Uploaded content"
            />
            <div style={{ fontSize: "0.8em", marginTop: "5px" }}>
              Tags: {image.tags?.join(", ") || "No tags"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
