import React from 'react';

const Base64Image = ({ base64String }) => {
  const imageUrl = `data:image/jpeg;base64,${base64String}`;

  return <img src={imageUrl} alt="Base64" />;
};

export default Base64Image;