import React from "react";

const NameInputs = (props) => {
  return (
    <>
      <input
        type="text"
        name="firstName"
        value={props.firstName}
        onChange={(e) => props.setFirstName(e.target.value.trim())}
        placeholder="Your First Name"
      />
      <input
        type="text"
        name="lastName"
        value={props.lastName}
        onChange={(e) => props.setLastName(e.target.value.trim())}
        placeholder="Your Last Name"
      />
      <button onClick={props.handleSaveUserInfo}>Save</button>
    </>
  );
};

export default NameInputs;
