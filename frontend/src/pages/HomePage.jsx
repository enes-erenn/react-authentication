import React from "react";
import axios from "axios";

const HomePage = () => {
  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/test-email");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button onClick={sendEmail}>send</button>
    </div>
  );
};

export default HomePage;
