import React from "react";

const Notification = ({ confMessage, setConfMessage }) => {
  if (confMessage === "") {
    return "";
  }
  setTimeout(() => {
    setConfMessage("");
  }, 4000);
  if (confMessage[1] === 1) {
    return (
      <>
        <p className="notif-success">{confMessage[0]}</p>
      </>
    );
  } else {
    return (
      <>
        <p className="notif-fail">{confMessage[0]}</p>
      </>
    );
  }
};
export default Notification;
