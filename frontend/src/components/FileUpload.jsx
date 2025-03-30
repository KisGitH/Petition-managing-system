import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    if (onFileUpload) {
      onFileUpload(event.target.files[0]);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor="file">Upload File</label>
      <input type="file" id="file" onChange={handleFileChange} className='border-1 border-[#1F9BEE] rounded outline-none p-1' />
    </div>
  );
};

export default FileUpload;
