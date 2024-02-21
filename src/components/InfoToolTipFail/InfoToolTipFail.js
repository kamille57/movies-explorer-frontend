import React from "react";
import InfoToolTips from "../InfoToolTips/InfoToolTips.js"
import fail from '../../images/Fail.svg';

function InfoToolTipFail({ isOpen, onClose, serverError }) {
    
    return (
        <InfoToolTips
            title={serverError}
            tooltipImg={fail}
            name="toolTipFail"
            isOpen={isOpen}
            onClose={onClose}
        >
        </InfoToolTips>
    )
}

export default InfoToolTipFail;