import React from 'react';
import "../Checklist/index.css";
const SampleInput = ({ data,formData,setFormData }) => {
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  return (
    <>
      <div className="checklist_container">
        <h1>Sample</h1>
        <p>Please fill in the sample data</p>

        <div className="checklist_sample">
          {data?.map((item, index) => (
            <div className="checkbox-label_sample" key={index}>
              <label className="sample-label">{item.name}</label>
              <input
                type="text"
                id={item.name}
                
                name={item.name}
                value={formData[item.name] || ''}
                onChange={handleInputChange}
                
                required
              />
            </div>
          ))}
          
        </div>
      </div>
    </>
  );
};

export default SampleInput;