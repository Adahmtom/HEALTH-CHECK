import React, { useContext } from "react";
import { Avatar } from "../Avatar";
import styles from "./styles.module.css";
import { AuthContext } from "../../context";
import { useGetMe } from "../../modules/Auth/hooks";


const Header = ({ title }) => {
  const { user } = useContext(AuthContext);
  const data = useGetMe()
  
  
  
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>

      <div className={styles.user}>
        <div className={styles.profile}>
          <img
            src={data?.data?.photo ? data?.data?.photo : Avatar(data?.data?.gender)}
            alt="DP"
          />
        </div>
        <div className={styles.name}>Hi {user?.fullname}</div>
      </div>
    </div>
  );
};

export default Header;
