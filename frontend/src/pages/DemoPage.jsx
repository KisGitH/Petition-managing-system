import React, { useState } from "react";
import axios from "axios";

function DemoPage() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/predict/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Convert response data to downloadable CSV file
      const blob = new Blob([response.data.processed_data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Upload CSV for Prediction</h2>
        
        <input type="file" onChange={handleFileChange} className="mb-4 p-2 border rounded" />
        <button 
          onClick={handleUpload} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload & Predict
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="predicted_output.csv"
            className="mt-4 block text-center text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Download Predictions
          </a>
        )}
      </div>
    </div>
  );
}

export default DemoPage;
