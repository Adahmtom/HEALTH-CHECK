import React from "react";
import { ThreeDots } from "react-loader-spinner";
import styles from "./styles.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#1A89C2"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      <p>Loading....</p>
    </div>
  );
};

export default Loader;
