import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './FileUpload';

const AddPetition = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    gender: '',
    adhar: '',
    subject: '',
    description: '',
    file_url: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/', formData);
      alert('Petition submitted successfully');
      console.log(response.data);
    } catch (error) {
      alert('Error submitting petition');
      console.error(error);
    }
  };

  return (
    <div className='container mx-auto my-15 px-10 md:px-30'>
      <h1 className='text-3xl font-bold text-[#1F9BEE]'>Submit your petition</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col text-xl gap-2 mt-5'>
        <h1 className='text-2xl font-medium text-[#1F9BEE]'>Petitioner</h1>

        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" placeholder='Enter your name'
          className='border-1 border-[#1F9BEE] rounded outline-none p-1'
          required autoComplete='on' value={formData.name} onChange={handleChange} />

        <label htmlFor="address">Address</label>
        <textarea name="address" id="address" cols={30} rows={4} placeholder='Enter your address'
          className='border-1 border-[#1F9BEE] rounded outline-none p-1' 
          required autoComplete='on' value={formData.address} onChange={handleChange} />

        <label htmlFor="gender">Gender</label>
        <select name="gender" id='gender' required className='border-1 border-[#1F9BEE] rounded outline-none p-1' 
          value={formData.gender} onChange={handleChange}>
          <option value="">Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label htmlFor="adhar">Adhar Number</label>
        <input type="text" name="adhar" id="adhar" placeholder='Enter your Adhar number'
          className='border-1 border-[#1F9BEE] rounded outline-none p-1'
          required value={formData.adhar} onChange={handleChange} />

        <h1 className='text-2xl font-medium text-[#1F9BEE]'>Petition Details</h1>

        <label htmlFor="subject">Subject</label>
        <input type="text" name="subject" id="subject"
          className='border-1 border-[#1F9BEE] rounded outline-none p-1'
          required value={formData.subject} onChange={handleChange} />

        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" cols={30} rows={10} placeholder='Enter petition details'
          className='border-1 border-[#1F9BEE] rounded outline-none p-5' 
          required value={formData.description} onChange={handleChange} />

        <FileUpload onFileUpload={(file) => setFormData({ ...formData, file_url: file.name })} />


        <div className='flex gap-5 mt-5'>
          <button type="submit" className='w-fit px-4 py-2 bg-[#1F9BEE] text-white rounded-l-xl hover:bg-white hover:text-[#1F9BEE] hover:border'>
            Submit
          </button>
          <button type="reset" className='w-fit px-4 py-2 text-[#1F9BEE] border rounded-r-xl hover:bg-[#ee1f1f] hover:text-white'
            onClick={() => setFormData({ name: '', address: '', gender: '', adhar: '', subject: '', description: '', file_url: '' })}>
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPetition;
