import React from "react";
import InfoToolTips from "../InfoToolTips/InfoToolTips.js";
import success from "../../images/Success.svg";

function InfoToolTipSuccess({ isOpen, onClose, serverMessage }) {
  return (
    <InfoToolTips
      title={serverMessage}
      tooltipImg={success}
      name="toolTipSuccess"
      isOpen={isOpen}
      onClose={onClose}
    ></InfoToolTips>
  );
}

export default InfoToolTipSuccess;
