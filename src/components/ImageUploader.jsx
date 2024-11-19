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
  const [searchTag, setSearchTag] = useState("");
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const result = await uploadImage(file, ["sample"]);
      alert("Upload successful!");
      setFile(null);
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
        <input type="file" onChange={handleFileChange} accept="image/*" />
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {images.map((image) => (
          <AdvancedImage
            key={image.public_id}
            cldImg={cld
              .image(image.public_id)
              .resize(fill().width(200).height(200))}
            alt="Uploaded content"
          />
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
