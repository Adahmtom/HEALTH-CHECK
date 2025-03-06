import React, { useState } from "react";
import styles from "./styles.module.css";
import { Avatar } from "../Avatar";
import "../../shared/button.css";
import {  useEditPicture } from "../Profile Form/hooks";
import { useGetMe } from "../../modules/Auth/hooks";
import { useEffect } from "react";
import { errorAlert, successAlert } from "../../utils";
import swal from "sweetalert";

const ProfilePicture = () => {
  const { data } = useGetMe();
 

  useEffect(() => {
    setFormData(data);
    setPassPort(data?.photo);
  }, [data]);

  const [passport, setPassPort] = useState(false);
  const [loading,setLoading] = useState(false);
  const [formData, setFormData] = React.useState({});
 
  


  const { mutate, isSuccess, isError, reset, error } = useEditPicture();

  if (isSuccess) {
    setLoading(false)
    reset();
    successAlert("Profile Photo successfully");
  }

  if (isError) {
    reset();
    errorAlert(error);
  }



  const fileUpload = (name, file, setFormData, setPassport) => {

    if (!file) {
      swal("Please select a file");
      return;
    }
  
    if (file.size > 5 * 1024 * 1024) {
      swal("File is too large (maximum size is 5MB)");
      return;
    }
  setLoading(true)
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const base64Url = event.target.result;
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
        photo: base64Url,
      }));
  
       setPassport(base64Url);
  setLoading(false)
     
  const newData = {
   ...formData, file:file
    
  }
      
       mutate(newData);
      
    };
  
    reader.readAsDataURL(file);
  };
  return (
    <div className={styles.container}>
      <div className={styles.picture}>
        <img src={passport ? passport : Avatar(data?.gender)} alt="DP" />
      </div>
      <div>
      <div className={styles.uploadWrapper}>
       
          
        <button className={`${styles.uploadBtn_}`} disabled={loading} >upload Picture {loading && <span className={styles.loading}>loading image</span>}</button>
            <input
                type="file"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  fileUpload('photo', selectedFile, setFormData, setPassPort);
                }}
               
                accept=".jpg, .jpeg, .png,"
            />
       
        </div>
     
      </div>
    </div>
  );
};

export default ProfilePicture;
