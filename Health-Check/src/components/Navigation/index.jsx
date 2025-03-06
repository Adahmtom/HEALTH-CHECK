import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import logo from "../../assets/healthcareLogo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../context";
import { Link } from "react-router-dom";
import Config from "./Config";
import { Avatar } from "../Avatar";
import { useGetMe } from "../../modules/Auth/hooks";

const Navigation = ({ name }) => {
  const [toggle, setToggle] = useState(false);
  const { user } = useContext(AuthContext);
  const data = useGetMe()
 
  return (
    <>
      <ToastContainer />
      <div className={styles.mobileNav}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className={styles.bars}>
          {toggle ? (
            <FaTimes onClick={() => setToggle(!toggle)} />
          ) : (
            <FaBars onClick={() => setToggle(!toggle)} />
          )}
        </div>
      </div>
      <div className={toggle ? styles.mobileNavigation : styles.navigation}>
        {!toggle && (
          <>
            <div className={styles.logo1}>
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>
            <div className={styles.logo2}>
            <img
            src={data?.data?.photo ? data?.data?.photo : Avatar(data?.data?.gender)}
            alt="DP"
          />
            </div>
            <div className={styles.userName}>
              <h3>{user?.fullname}</h3>
              <p>{user?.role === "MedicalDispatcher" ? "Medical Dispatcher" : user?.role === "SampleCollectionExpert" ? "Sample Collection Expert" : user?.role   }</p>
            </div>
          </>
        )}
        <Config name={name} roles={user?.role} />
      </div>
    </>
  );
};

export default Navigation;
