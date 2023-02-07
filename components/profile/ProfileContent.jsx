import React from "react";
import Notification from "./Notification";
import PersonalInfo from "./PersonalInfo";
import ProfileInfo from "./ProfileInfo";
import Orders from "./Orders";
import Privacy from "./Privacy";

function ProfileContent({ choice }) {
  const handlerChoice = () => {
    switch (choice) {
      case "personal information":
        return <PersonalInfo />;
      case "notifications":
        return <Notification />;
      case "privacy":
        return <Privacy />;
      case "orders":
        return <Orders />;
      default:
        return <ProfileInfo />;
    }
  };

  return <div className="md:col-span-3">{handlerChoice()}</div>;
}

export default ProfileContent;
