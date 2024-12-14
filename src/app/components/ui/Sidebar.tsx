import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../assets/styles/Sidebar.css";

import homeIcon from "../../../assets/icons/home-icon.png";
import connectIcon from "../../../assets/icons/connect-icon.png";
import scheduleIcon from "../../../assets/icons/schedule-icon.png";
import analyticsIcon from "../../../assets/icons/analytics-icon.png";
import digitalMarketingIcon from "../../../assets/icons/digitalmarketing-icon.png";
import brainstormIcon from "../../../assets/icons/brainstorm-icon.png";
import heartIcon from "../../../assets/icons/heart-icon.png";
import competitorAnalysisIcon from "../../../assets/icons/competitoranalysis-icon.png";
import quillpenIcon from "../../../assets/icons/quillpen-icon.png";
import websiteIcon from "../../../assets/icons/website-icon.png";
import layersIcon from "../../../assets/icons/layers-icon.png";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false); // Hover state

  const menuItems = [
    {
      name: "Dashboard Home",
      path: "/dashboard",
      icon: <img src={homeIcon} alt="Dashboard" />,
      end: true,
    },
    {
      name: "Social Accounts Linking",
      path: "/dashboard/social-accounts",
      icon: <img src={connectIcon} alt="Social Accounts" />,
    },
    {
      name: "Publishing & Scheduling",
      path: "/dashboard/publishing",
      icon: <img src={scheduleIcon} alt="Publishing & Scheduling" />,
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics-home",
      icon: <img src={analyticsIcon} alt="Analytics" />,
    },
    {
      name: "Digital Marketing",
      path: "/dashboard/digital-marketing",
      icon: <img src={digitalMarketingIcon} alt="Digital Marketing" />,
    },
    {
      name: "AI Assistant",
      path: "/dashboard/ai-assistant",
      icon: <img src={brainstormIcon} alt="AI Assistant" />,
    },
    {
      name: "Influencer Management",
      path: "/dashboard/influencer-managment",
      icon: <img src={heartIcon} alt="Influencer Management" />,
    },
    {
      name: "Competitor Analysis",
      path: "/dashboard/competitor-analysis",
      icon: <img src={competitorAnalysisIcon} alt="Competitor Analysis" />,
    },
    {
      name: "Product Development",
      path: "/dashboard/product-development",
      icon: <img src={quillpenIcon} alt="Product Development" />,
    },
    {
      name: "Website Management",
      path: "/dashboard/website-management",
      icon: <img src={websiteIcon} alt="Website Management" />,
    },
    {
      name: "Team & Tasks",
      path: "/dashboard/team-tasks",
      icon: <img src={layersIcon} alt="Team & Tasks" />,
    },
  ];
  

  return (
    <div
      className={`sidebar ${isCollapsed && !isHovered ? "collapsed" : ""}`}
      onMouseEnter={() => setIsHovered(true)} // Expand on hover
      onMouseLeave={() => setIsHovered(false)} // Collapse when not hovering
    >
      

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end} // Apply the "end" prop for exact match
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            title={isCollapsed ? item.name : ""}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {(!isCollapsed || isHovered) && <span className="sidebar-text">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
