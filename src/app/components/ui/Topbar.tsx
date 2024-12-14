import React, { useState, useEffect, useRef } from "react";
import { MdSearch, MdNotifications } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch"; // Assuming this hook is configured
import "../../../assets/styles/Topbar.css";
import NotificationIcon from "../../../assets/icons/notification-icon.png";

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { userDetails, logout } = useFetch();
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference for the dropdown

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Close the dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="topBar">
      {/* Centered Search Bar */}
      <div className="searchContainer">
        <MdSearch size={20} className="searchIcon" />
        <input
          className="searchInput"
          type="text"
          placeholder="Search posts, insights, or analytics"
        />
      </div>

      {/* Right Section with Notifications and Avatar */}
      <div className="rightSection">
        <div className="iconContainer">
        <img
            src={NotificationIcon} // Use the imported icon here
            alt="Notifications"
            className="icon"
        />
        </div>
        <div className="avatarContainer" onClick={toggleDropdown}>
          <img
            src={userDetails?.profilePicture || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="avatar"
          />
        </div>

        {/* Dropdown Menu */}
        {dropdownVisible && (
          <div className="dropdown" ref={dropdownRef}>
            <p className="userEmail">{userDetails?.email || "Guest"}</p>
            <div
              className="dropdownItem"
              onClick={() => navigate("/dashboard/my-account")}
            >
              <span className="dropdownText">My Account</span>
            </div>
            <div className="dropdownItem" onClick={handleLogout}>
              <span className="logoutText">Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
