import React, { useState } from "react";
import "./index.css";

const Checklist = ({ checklist, setCheckedItems }) => {
  const [checkedItems, setLocalCheckedItems] = useState([]);

  const handleCheckboxChange = (event) => {
    const itemName = event.target.name;
    setLocalCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(itemName)) {
        return prevCheckedItems.filter((item) => item !== itemName);
      } else {
        return [...prevCheckedItems, itemName];
      }
    });

    // Update the parent component's checkedItems state
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(itemName)) {
        return prevCheckedItems.filter((item) => item !== itemName);
      } else {
        return [...prevCheckedItems, itemName];
      }
    });
  };

  return (
    <>
      <div className="checklist_container">
        <h1>Checklist</h1>
        <p>Please confirm you have all of the items by checking the boxes</p>
      
        <div className="checklist">
          {checklist.map((item, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                className="checkboxy"
                name={item}
                checked={checkedItems.includes(item)}
                onChange={handleCheckboxChange}
                required
              />
              <div className="checkbox-labels" key={index}>
                {" "}
                {item}
              </div>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default Checklist;