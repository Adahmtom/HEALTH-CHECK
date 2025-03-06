import React, { useState } from "react";
import styles from "./styles.module.css";

const Tab = ({ label, selected, onClick }) => {
  return (
    <div
      className={`${styles.tab} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

const TabMenu = ({ tabs, children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <div className={styles.tabContainer}>
      <div>
        <h3>Results</h3>
        <p>See available results for your review</p>
      </div>
      <div className={styles.tabMenu}>
        <div className={styles.tabList}>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              selected={selectedTab === index}
              onClick={() => handleTabClick(index)}
            />
          ))}
        </div>
        <div className={styles.tabContent}>{children[selectedTab]}</div>
      </div>
    </div>
  );
};

export default TabMenu;
