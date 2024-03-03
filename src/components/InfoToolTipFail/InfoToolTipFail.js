import React from "react";
import InfoToolTips from "../InfoToolTips/InfoToolTips.js";
import fail from "../../images/Fail.svg";

function InfoToolTipFail({ isOpen, onClose, serverMessage }) {
  return (
    <InfoToolTips
      title={serverMessage}
      tooltipImg={fail}
      name="toolTipFail"
      isOpen={isOpen}
      onClose={onClose}
    ></InfoToolTips>
  );
}

export default InfoToolTipFail;
