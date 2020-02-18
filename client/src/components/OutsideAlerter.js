// Code borrowed from stack overflow @ Ben Bud

import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideAlerter = props => {
  /**
   * Alert if clicked on outside of element
   */
  const handleClickOutside = event => {
    if (
      (props.wrapperRef.current &&
        !props.wrapperRef.current.contains(event.target)) ||
      event.keyCode === 27
    ) {
      props.setPlantForm(0);
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleClickOutside, false);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleClickOutside, false);
    };
  });
};

export default function OutsideAlerter(props) {
  const setPlantForm = props.setPlantForm;
  const wrapperRef = useRef(null);
  useOutsideAlerter({ wrapperRef, setPlantForm });

  return (
    <div className="plant-form-wrapper" ref={wrapperRef}>
      {props.children}
    </div>
  );
}
