import React from "react";
import Layout from "../../layout";
import ProfilePicture from "../../components/Profile Picture";
import ProfileForm from "../../components/Profile Form";
import styles from "../Patient/styles.module.css";

const Profile = () => {
  return (
    <Layout name="Profile" title="Profile">
      <div className={styles.profile_container}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <ProfilePicture />
        </div>
        <div>
          <ProfileForm />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
