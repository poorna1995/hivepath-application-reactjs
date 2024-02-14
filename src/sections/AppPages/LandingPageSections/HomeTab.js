import React from "react";
import OfferingBlogs from "../UserProfileSections/Offerings/Blogs";
import EventOfferings from "../UserProfileSections/Offerings/Events";
import UserProfilesList from "./UserProfilesList";

const HomeTab = () => {
  return (
    <div>
      <div style={{ paddingBottom: "40px" }}>
        <UserProfilesList title="Expand Your Network" row />
      </div>
      <div style={{ paddingBottom: "40px" }}>
        <OfferingBlogs />
      </div>
      <div style={{ paddingBottom: "80px" }}>
        <EventOfferings />
      </div>
    </div>
  );
};

export default HomeTab;
