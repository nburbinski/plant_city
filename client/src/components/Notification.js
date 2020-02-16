import React from "react";

const Notification = ({ confMessage, setConfMessage }) => {
  if (confMessage === "") {
    return "";
  }
  setTimeout(() => {
    setConfMessage("");
  }, 4000);

  return (
    <>
      <p className="notif">{confMessage}</p>
    </>
  );
};
export default Notification;
