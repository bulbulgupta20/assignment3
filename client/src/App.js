import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import './App.css';

function App() {
  const [images, setImages] = useState([]);

  const handleDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('image', acceptedFiles[0]);

    const response = await axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setImages((prevImages) => [...prevImages, response.data.imageUrl]);
  };

  const handleDelete = async (imageUrl) => {
    const filename = imageUrl.split('/').pop();

    await axios.delete(`http://localhost:5000/delete/${filename}`);

    setImages((prevImages) => prevImages.filter((image) => image !== imageUrl));
  };

  return (
    <div className="App">
      <h1>Photo Gallery</h1>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag & drop some files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
      <div className="gallery">
        {images.map((image) => (
          <div key={image} className="image-item">
            <img src={image} alt="Uploaded" />
            <button onClick={() => handleDelete(image)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;



