// client/src/components/ImageUpload.jsx
import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

const ImageUpload = ({ onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // 1. Get the signature from our backend
      const signatureResponse = await api.get("/api/cloudinary/signature");
      const { signature, timestamp } = signatureResponse.data;

      // 2. Create a FormData object to send to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      // 3. Make the POST request directly to Cloudinary's API
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const xhr = new XMLHttpRequest();
      xhr.open("POST", cloudinaryUrl, true);

      // Monitor upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round(
            (event.loaded * 100) / event.total
          );
          setUploadProgress(percentCompleted);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          toast.success("Image uploaded successfully!");
          onUploadSuccess(response.secure_url); // Pass the new URL to the parent form
        } else {
          toast.error("Image upload failed. Please try again.");
        }
        setIsUploading(false);
      };

      xhr.onerror = () => {
        toast.error("An error occurred during upload.");
        setIsUploading(false);
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Could not prepare image for upload.");
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-brand-dark">
        Upload Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-accent/10 file:text-brand-accent hover:file:bg-brand-accent/20"
      />
      {isUploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-brand-accent h-2.5 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
