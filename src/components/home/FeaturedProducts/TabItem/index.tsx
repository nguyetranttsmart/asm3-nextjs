import React from "react";
import styles from "./TabItem.module.css";

interface ITabItem {
  label: string;
  iconUrl?: string;
}

const TabItem: React.FC<ITabItem> = ({ label, iconUrl }) => {
  return (
    <div className={styles.tabItem}>
      <img src={iconUrl} />
      {label}
    </div>
  );
};

export default TabItem;
