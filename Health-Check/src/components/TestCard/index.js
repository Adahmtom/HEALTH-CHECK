import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const index = ({ TestName, PatientName, Location, Date, url = "" }) => {
  return (
    <>
      <div>
        <div className="card" key={index}>
          <div className="text">
            <h2>{TestName}</h2>
            <br />
            <h3>Patient's Name</h3>
            <p>{PatientName}</p>
            <h3>Patient's Location</h3>
            <p>{Location}</p>
            <br />
            <p>{Date}</p>
          </div>
          <Link className="cads" to={url}>
            <h2>VIEW</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default index;
