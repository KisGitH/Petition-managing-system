import { useState } from "react";

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="p-2 bg-white border mt-2 border-[#1F9BEE] rounded-b-xl">
      <label className="cursor-pointer flex flex-col items-center p-5 bg-white rounded-xl">
        <div className="text-center">
          <span className="inline-flex justify-center items-center size-16 bg-gray-100 text-gray-800 rounded-full">
            <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
          </span>
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-medium text-gray-800">Drop your file here or </span>
            <span className="text-blue-600 font-semibold hover:underline">browse</span>
          </div>
          <p className="mt-1 text-xs text-gray-400">Pick a file related to petition</p>
        </div>
        <input type="file" className="hidden" onChange={handleFileChange} multiple/>
      </label>

      <div className="mt-4 space-y-2 ">
        {files.map((file, index) => (
          <div key={index} className="p-3 bg-white border border-[#1F9BEE] rounded-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-3">
                <span className="size-10 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg">
                  <img className="rounded-lg" src={URL.createObjectURL(file)} alt="preview" />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800 truncate max-w-[300px]">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-800" onClick={() => handleRemoveFile(index)}>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
