import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToken from "../hooks/auth/useToken";
import useUser from "../hooks/auth/useUser";
import Message from "../components/Message";
import NameInputs from "../components/UserProfile/NameInputs";

const UserProfilePage = () => {
  const user = useUser();
  const { id, isVerified, info } = user;
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(info?.firstName || "");
  const [lastName, setLastName] = useState(info?.lastName || "");
  const [message, setMessage] = useState("");

  const handleSaveUserInfo = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `http://localhost:8080/api/users/${id}`,
          {
            firstName,
            lastName,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setToken(res.data.token);
          setMessage("User infos successfully updated.");
        });
    } catch (err) {
      setMessage("User infos is not updated.");
      console.log(err);
    }
  };

  const handleReset = () => {
    setFirstName(info?.firstName);
    setLastName(info?.lastName);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <NameInputs
        firstName={firstName}
        lastName={lastName}
        setFirstName={(firstName) => setFirstName(firstName)}
        setLastName={(lastName) => setLastName(lastName)}
        handleSaveUserInfo={handleSaveUserInfo}
      />
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleLogout}>Logout</button>
      {!isVerified && <p>Please verify your email.</p>}
      {message && <Message message={message} />}
    </>
  );
};

export default UserProfilePage;
