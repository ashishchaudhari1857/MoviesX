import React, { useState } from "react";
import "./style.scss";

function SwitchTab({ data, onTabChange }) {
  const [left, setleft] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const activeTab = (tab, index) => {
    console.log("tab in the swithc" , tab)
    setleft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            onClick={() => activeTab(tab, index)}
            key={index}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }}></span>
      </div>
    </div>
  );
}

export default SwitchTab;
