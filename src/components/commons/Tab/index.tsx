"use client";
import React, { useMemo, useState } from "react";
import styles from "./Tabs.module.css";
import Test from "@/components/home/Test";

export interface ITabItem {
  label:
    | string
    | React.ReactNode
    | ((selectedItem?: ITabItem) => React.ReactNode);
  key: string;
  component?: React.ReactNode;
}

interface TabsProps {
  tabs: ITabItem[];
  defaultKey?: string;
  renderContent?: (selectedItem: ITabItem) => React.ReactNode;
}

export default function Tabs({ tabs, defaultKey, renderContent }: TabsProps) {
  const [selectedKey, setSelectedKey] = useState<string>(
    defaultKey || tabs?.[0]?.key
  );
  const selectedItem = useMemo(() => {
    return tabs.find((item) => item.key === selectedKey);
  }, [selectedKey]);

  console.log("selectedItem", selectedItem);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`${styles.tabItem} ${
              tab.key === selectedKey ? styles.active : ""
            }`}
            onClick={() => setSelectedKey(tab.key)}
          >
            {typeof tab.label === "function"
              ? tab.label(selectedItem)
              : tab.label}
          </div>
        ))}
      </div>
      <div className={styles.tabContent}>
        <Test key={selectedItem.key} />
      </div>
    </div>
  );
}
