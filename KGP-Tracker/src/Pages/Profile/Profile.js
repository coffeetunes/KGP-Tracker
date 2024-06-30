import React from "react";
import "./Profile.scss"
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="main-heading mt-5">To Twój profil, {user.name}</h2>
    </div>
  );
};

export default Profile;
